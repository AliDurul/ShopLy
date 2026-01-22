import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getHello(): string {
    return this.reviewService.getHello();
  }
}
