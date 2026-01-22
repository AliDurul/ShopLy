import { Test, TestingModule } from '@nestjs/testing';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

describe('PricingController', () => {
  let pricingController: PricingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PricingController],
      providers: [PricingService],
    }).compile();

    pricingController = app.get<PricingController>(PricingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pricingController.getHello()).toBe('Hello World!');
    });
  });
});
