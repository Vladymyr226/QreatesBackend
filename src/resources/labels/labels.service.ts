import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createLabelDto: CreateLabelDto): Promise<Label> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const label = this.labelRepository.create({
      ...createLabelDto,
      user: user,
    });

    return this.labelRepository.save(label);
  }

  async findAllByUserId(userId: number): Promise<Label[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.labelRepository.find({
      where: { user: user },
    });
  }

  async findOne(userId: number, labelId: number): Promise<Label> {
    const label = await this.labelRepository.findOne({
      where: { id: labelId, user: { id: userId } },
      relations: ['user'],
    });

    if (!label) {
      throw new NotFoundException(
        `Label with ID ${labelId} not found for user ID ${userId}`,
      );
    }

    return label;
  }

  async update(
    userId: number,
    labelId: number,
    updateLabelDto: UpdateLabelDto,
  ): Promise<Label> {
    const label = await this.labelRepository.findOne({
      where: { id: labelId, user: { id: userId } },
      relations: ['user'],
    });

    if (!label) {
      throw new NotFoundException(
        `Label with ID ${labelId} not found for user ID ${userId}`,
      );
    }

    Object.assign(label, updateLabelDto);

    return this.labelRepository.save(label);
  }

  async remove(userId: number, labelId: number): Promise<void> {
    const label = await this.labelRepository.findOne({
      where: { id: labelId, user: { id: userId } },
      relations: ['user'],
    });

    if (!label) {
      throw new NotFoundException(
        `Label with ID ${labelId} not found for user ID ${userId}`,
      );
    }

    await this.labelRepository.remove(label);
  }
}
