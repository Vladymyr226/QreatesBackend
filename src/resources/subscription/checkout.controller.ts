import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './checkout.service';
import Stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-payment-intent')
  async createPaymentIntent(
    @Body() paymentIntentData: Stripe.PaymentIntentCreateParams,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripeService.createPaymentIntent(paymentIntentData);
  }
}
