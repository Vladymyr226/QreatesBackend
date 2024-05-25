import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { UsersModule } from './resources/users/users.module';
import { User } from './resources/users/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LabelsModule } from './resources/labels/labels.module';
import { Label } from './resources/labels/entities/label.entity';
import { Product } from './resources/products/entities/product.entity';
import { ProductsModule } from './resources/products/products.module';
import { PaymentsModule } from 'src/resources/subscription/checkout.module';
import { AdminsModule } from 'src/resources/admins/admins.module';
import { ImageGeneratorModule } from './resources/image-generator/image-generator.module';
dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Label, Product],
      synchronize: true,
    }),
    UsersModule,
    LabelsModule,
    ProductsModule,
    PaymentsModule,
    AdminsModule,
    ImageGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
