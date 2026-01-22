import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingService {
  getHello(): string {
    return 'Hello World!';
  }
}
