import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly value: string;
}
