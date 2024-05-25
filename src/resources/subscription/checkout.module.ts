import { Module } from '@nestjs/common';
import { StripeService } from './checkout.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './checkout.controller';

@Module({
  providers: [StripeService],
  imports: [ConfigModule],
  controllers: [PaymentsController],
  exports: [StripeService],
})
export class PaymentsModule {}
