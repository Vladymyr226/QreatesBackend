import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/entities/user.entity';
import { saveBase64Image } from '../../utils/image-upload.utils';
import { ProductState } from '../../constants/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createProductDto: CreateProductDto,
  ): Promise<Product[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const uploadDir = 'uploads/products';
    const products: Product[] = [];
    for (const base64Image of createProductDto.images) {
      const imagePath = await saveBase64Image(base64Image.imageUrl, uploadDir);

      const product = this.productRepository.create({
        ...createProductDto,
        images: [{ imageUrl: imagePath }],
        user: [user],
      });
      const savedProduct = await this.productRepository.save(product);
      products.push(savedProduct);
    }

    return products;
  }

  async findAllByUserId(userId: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });

    if (products.length === 0) {
      throw new NotFoundException(
        `No products found for user with ID ${userId}`,
      );
    }

    return products;
  }

  async findAllApproved(): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { state: ProductState.APPROVED },
      relations: ['user'],
      order: { id: 'DESC' },
    });

    if (products.length === 0) {
      throw new NotFoundException(`No approved products found`);
    }

    return products;
  }

  async findAllCompletelyApprovedProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      where: { state: ProductState.COMPLETELY_APPROVED },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async findOne(userId: number, productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId, user: { id: userId } },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productId} not found for user ID ${userId}`,
      );
    }
    return product;
  }

  async update(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId, user: { id: userId } },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productId} not found for user ID ${userId}`,
      );
    }

    if (updateProductDto.delta !== undefined) {
      product.delta = updateProductDto.delta;
    }

    return this.productRepository.save(product);
  }

  async remove(userId: number, productId: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId, user: { id: userId } },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productId} not found for user ID ${userId}`,
      );
    }

    await this.productRepository.remove(product);
  }
}
