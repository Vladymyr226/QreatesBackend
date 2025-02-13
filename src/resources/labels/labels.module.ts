import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { Label } from './entities/label.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), UsersModule],
  controllers: [LabelsController],
  providers: [LabelsService],
  exports: [TypeOrmModule.forFeature([Label])],
})
export class LabelsModule {}
