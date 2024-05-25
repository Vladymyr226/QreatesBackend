import { IsEmail, IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '../../../constants/user';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(2, 32)
  readonly name?: string;

  @IsString()
  @Length(2, 64)
  readonly lastName?: string;

  @IsString()
  @Length(2, 32)
  readonly username: string;

  @IsString()
  @Length(6, 256)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;

  @IsEnum(UserStatus)
  readonly status?: UserStatus;

  @IsString()
  @Length(10, 64)
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  @Length(2, 64)
  readonly companyName?: string;

  @IsString()
  @IsOptional()
  readonly brandName?: string;
}
