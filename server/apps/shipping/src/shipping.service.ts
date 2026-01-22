import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  getHello(): string {
    return 'Hello World!';
  }
}
