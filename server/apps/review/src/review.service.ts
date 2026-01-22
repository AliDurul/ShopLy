import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  getHello(): string {
    return 'Hello World!';
  }
}
