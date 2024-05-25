import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateProductDto } from './dto/update-product.dto';
import Roles from '../auth/roles.decorator';
import { UserRole } from 'src/constants/user';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import RolesGuard from 'src/guard/roles.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/products')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllProducts() {
    return this.adminsService.getAllProducts();
  }

  @Get('/products/approved')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getApprovedProducts() {
    return this.adminsService.getAllApprovedProducts();
  }

  @Get('/products/completely-approved')
  // @Roles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getCompletelyApprovedProducts() {
    return this.adminsService.getAllCompletelyApprovedProducts();
  }

  @Get('/products/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getProductById(@Param('id') id: string) {
    return this.adminsService.getProductById(+id);
  }

  @Put('/products/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.adminsService.updateProduct(+id, updateProductDto);
  }

  @Delete('/products/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.adminsService.deleteProduct(+id);
  }

  @Get('/users')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllUsers() {
    return this.adminsService.getAllUsers();
  }

  @Get('/users/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserById(@Param('id') id: string) {
    return this.adminsService.getUserById(+id);
  }

  @Get('/users/search')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async searchUsers(@Query('query') query: string) {
    return this.adminsService.searchUsers(query);
  }

  @Put('/users/:id/credits')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUserCredits(
    @Param('id') id: number,
    @Body('credits') credits: number,
  ) {
    return this.adminsService.updateUserCredits(id, credits);
  }
}
