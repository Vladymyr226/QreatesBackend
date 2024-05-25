import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:userId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createProduct(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(userId, createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findProductsByUser(@Param('userId') userId: string) {
    return this.productsService.findAllByUserId(+userId);
  }

  @Get('/approved')
  @UseGuards(AuthGuard('jwt'))
  findApprovedProducts() {
    return this.productsService.findAllApproved();
  }

  @Get('/completely-approved')
  @UseGuards(AuthGuard('jwt'))
  async findAllCompletelyApprovedProducts() {
    return await this.productsService.findAllCompletelyApprovedProducts();
  }

  @Get(':productId')
  @UseGuards(AuthGuard('jwt'))
  findProductById(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.findOne(+userId, +productId);
  }

  @Put(':productId')
  @UseGuards(AuthGuard('jwt'))
  updateProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+userId, +productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  deleteProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.remove(+userId, +productId);
  }
}
