import { Controller, Post, Body } from '@nestjs/common';
import { ImageGeneratorService } from './image-generator.service';
import { GenerateImagesWithRefsDto } from './dto/generate-images-with-refs.dto';

@Controller('image-generator')
export class ImageGeneratorController {
  constructor(private readonly imageGeneratorService: ImageGeneratorService) {}

  @Post()
  async generateImageWithRefImgs(
    @Body() generateImagesWithRefsDto: GenerateImagesWithRefsDto,
  ) {
    return await this.imageGeneratorService.generateImageWithRefImgs(
      generateImagesWithRefsDto,
    );
  }
}
