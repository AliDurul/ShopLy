import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
