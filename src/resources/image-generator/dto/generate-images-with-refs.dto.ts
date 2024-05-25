import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateImagesWithRefsDto {
  @IsString()
  imageFile: string;

  @IsNumber()
  product_id: number;

  @IsString()
  prompt: string;

  @IsOptional()
  ref1img?: Blob;

  @IsOptional()
  ref2img?: Blob;

  @IsOptional()
  ref3img?: Blob;

  @IsOptional()
  ref4img?: Blob;

  @IsOptional()
  ref5img?: Blob;

  @IsOptional()
  ref6img?: Blob;

  @IsOptional()
  @IsString()
  refimg_for_style?: string;

  @IsOptional()
  @IsNumber()
  ref_imgs_total_weight?: number;

  @IsOptional()
  @IsNumber()
  style_transfer_weight?: number;

  @IsOptional()
  @IsString()
  negative_prompt?: string;
}
