import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly model?: string;

  @IsOptional()
  @IsString()
  readonly embedding?: string;

  @IsNumber()
  readonly delta: number;

  @IsNumber()
  readonly bias: number;

  @IsOptional()
  @IsString()
  readonly loraPath?: string;

  @IsOptional()
  @IsString()
  readonly loraTriggerWord?: string;

  @IsArray()
  @IsOptional()
  readonly images?: { imageUrl: string }[];

  @IsArray()
  @IsOptional()
  readonly labelImages?: { labelImageUrl: string }[];
}
