import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { ProductState } from '../../constants/product';
import { UpdateProductDto } from './dto/update-product.dto';
import { callIndexerGetModel } from '../../utils/call-indexer-getModel-utils';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllProducts(): Promise<any[]> {
    return this.productRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getAllCompletelyApprovedProducts(): Promise<any[]> {
    return this.productRepository.find({
      where: { state: ProductState.COMPLETELY_APPROVED },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.state === ProductState.APPROVED) {
      await callIndexerGetModel(product);
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: { id: 'ASC' },
    });
  }

  async updateUserCredits(id: number, credits: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.credits = credits;
    return this.userRepository.save(user);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query', { query: `%${query}%` })
      .orWhere('user.email ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async getUserById(id: number): Promise<User> {
    const userProducts = await this.productRepository.find({
      where: { user: { id } },
    });
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      ...user,
      products: userProducts,
    };
  }

  async getAllApprovedProducts() {
    return await this.productRepository.find({
      where: { state: ProductState.APPROVED },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }
}
