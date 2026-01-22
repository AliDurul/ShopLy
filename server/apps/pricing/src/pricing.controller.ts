import { Controller, Get } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  getHello(): string {
    return this.pricingService.getHello();
  }
}
