import { Controller, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  getHello(): string {
    return this.shippingService.getHello();
  }
}
