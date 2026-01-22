import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let reviewController: ReviewController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    }).compile();

    reviewController = app.get<ReviewController>(ReviewController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reviewController.getHello()).toBe('Hello World!');
    });
  });
});
