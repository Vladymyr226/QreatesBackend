import * as bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../utils/sendgrid.utils';
import { UserRole, UserStatus } from '../../constants/user';
import { isCompanyEmail } from 'company-email-validator';
import { callIndexerGetModel } from '../../utils/call-indexer-getModel-utils';
import { Product } from '../products/entities/product.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!isCompanyEmail(createUserDto.email)) {
      throw new BadRequestException('Please use your company email');
    }

    if (createUserDto.email.includes('.ru')) {
      throw new BadRequestException(`Please don't use .ru email addresses`);
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: UserStatus.EMAIL_NOT_CONFIRMED,
      token: uuidv4(),
      role: UserRole.USER,
    });

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    let user: User;

    if (loginUserDto.email) {
      user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });
    }

    if (!user && loginUserDto.username) {
      user = await this.userRepository.findOne({
        where: { username: loginUserDto.username },
      });
    }

    if (
      user &&
      (await bcryptjs.compare(loginUserDto.password, user.password))
    ) {
      const token = this.jwtService.sign({
        username: user.username,
        sub: user.id,
        role: user.role,
      });

      return {
        message: `user with id ${user.id} successfully logged in`,
        user,
        token,
      };
    }

    throw new UnauthorizedException('Please check your login credentials');
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async sendVerificationEmail(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    const verificationLink = `${process.env.FRONTEND_APP_URL}/signup?token=${user.token}`;

    await sendVerificationEmail(user.email, verificationLink);
  }
  async verifyEmailToken(token: string) {
    const user = await this.userRepository.findOne({ where: { token } });

    if (!user) {
      throw new NotFoundException('Verification failed. User not found.');
    }

    if (user.status === UserStatus.EMAIL_CONFIRMED) {
      throw new BadRequestException('Email is already verified.');
    }

    user.status = UserStatus.EMAIL_CONFIRMED;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully.' };
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.generatePasswordResetToken(email);

    await sendPasswordResetEmail(email, resetToken);
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }

    const resetToken = uuidv4();
    user.resetPasswordToken = resetToken;
    await this.userRepository.save(user);
    return resetToken;
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }
    const { password: newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    user.resetPasswordToken = null;

    await this.userRepository.save(user);
  }

  async verifyResetToken(token: string) {
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }

    return true;
  }

  async makeCallToIndexer(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    await callIndexerGetModel(product);
  }
}
