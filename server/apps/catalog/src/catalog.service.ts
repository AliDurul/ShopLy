import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  getHello(): string {
    return 'Hello World!';
  }
}
