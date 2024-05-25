import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:userId/labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createLabel(
    @Param('userId') userId: string,
    @Body() createLabelDto: CreateLabelDto,
  ) {
    return this.labelsService.create(+userId, createLabelDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findLabelsByUser(@Param('userId') userId: string) {
    return this.labelsService.findAllByUserId(+userId);
  }

  @Get(':labelId')
  @UseGuards(AuthGuard('jwt'))
  findLabelById(
    @Param('userId') userId: string,
    @Param('labelId') labelId: string,
  ) {
    return this.labelsService.findOne(+userId, +labelId);
  }

  @Put(':labelId')
  @UseGuards(AuthGuard('jwt'))
  updateLabel(
    @Param('userId') userId: string,
    @Param('labelId') labelId: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    return this.labelsService.update(+userId, +labelId, updateLabelDto);
  }

  @Delete(':labelId')
  @UseGuards(AuthGuard('jwt'))
  deleteLabel(
    @Param('userId') userId: string,
    @Param('labelId') labelId: string,
  ) {
    return this.labelsService.remove(+userId, +labelId);
  }
}
