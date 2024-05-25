import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
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
}
