import { IsString, IsOptional } from 'class-validator';

export class UpdateLabelDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly value?: string;
}
