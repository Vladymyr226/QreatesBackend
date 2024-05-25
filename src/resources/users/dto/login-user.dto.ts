import { IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsString()
  readonly password: string;
}
