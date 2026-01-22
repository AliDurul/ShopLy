import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
