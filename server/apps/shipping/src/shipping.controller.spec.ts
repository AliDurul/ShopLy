import { Test, TestingModule } from '@nestjs/testing';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

describe('ShippingController', () => {
  let shippingController: ShippingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShippingController],
      providers: [ShippingService],
    }).compile();

    shippingController = app.get<ShippingController>(ShippingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shippingController.getHello()).toBe('Hello World!');
    });
  });
});
