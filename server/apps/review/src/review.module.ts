import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
