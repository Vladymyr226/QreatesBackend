import { IsNumber, IsString } from 'class-validator';

export class CheckoutOptionDTO {
  @IsString()
  currency: string;

  @IsNumber()
  amount: number;
}
