import {
  IsEmail,
  IsString,
  Length,
  IsOptional,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { UserRole, UserStatus } from '../../../constants/user';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @Length(2, 64)
  @IsOptional()
  readonly lastName?: string;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  readonly username?: string;

  @IsString()
  @Length(6, 256)
  @IsOptional()
  readonly password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;

  @IsEnum(UserStatus)
  @IsOptional()
  readonly status?: UserStatus;

  @IsPhoneNumber(null)
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @Length(2, 64)
  @IsOptional()
  readonly companyName?: string;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  readonly brandDescription?: string;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  readonly webSite?: string;

  @IsString()
  @IsOptional()
  readonly brandName?: string;
}
