import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(6, 256)
  readonly password: string;

  @IsString()
  @Length(6, 256)
  readonly confirmPassword: string;
}
