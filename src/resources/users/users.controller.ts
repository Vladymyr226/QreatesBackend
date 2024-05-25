import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { callIndexerGetModel } from '../../utils/call-indexer-getModel-utils';
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post(':userId/verifyEmail')
  async verifyEmail(@Param('userId') userId: string) {
    return await this.usersService.sendVerificationEmail(+userId);
  }

  @Get('verify')
  async verifyEmailToken(@Query('token') token: string) {
    return this.usersService.verifyEmailToken(token);
  }

  @Post('reset-password')
  async sendResetPasswordEmail(@Body('email') email: string) {
    await this.usersService.sendPasswordResetEmail(email);
    return { message: 'Reset password email sent' };
  }

  @Post('verify-reset-token')
  async verifyResetToken(@Body('token') token: string) {
    return await this.usersService.verifyResetToken(token);
  }

  @Post('reset-user-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.usersService.resetPassword(token, resetPasswordDto);
    return { message: 'Password has been reset successfully' };
  }

  @Post('makeCallToIndexer')
  async makeCallToIndexer(@Query('productId') productId: string) {
    return await this.usersService.makeCallToIndexer(+productId);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
