import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductState } from 'src/constants/product';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  readonly model?: string;

  @IsOptional()
  @IsString()
  readonly embedding?: string;

  @IsNumber()
  @IsOptional()
  readonly delta: number;

  @IsNumber()
  @IsOptional()
  readonly bias: number;

  @IsOptional()
  @IsString()
  readonly loraPath?: string;

  @IsOptional()
  @IsString()
  readonly loraTriggerWord?: string;

  @IsEnum(ProductState)
  state: ProductState;
}
