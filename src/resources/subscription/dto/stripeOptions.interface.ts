import Stripe from 'stripe';
import { IsString } from 'class-validator';

export class StripeModuleOptions {
  @IsString()
  readonly apiKey: string;

  readonly options: Stripe.StripeConfig;
}
