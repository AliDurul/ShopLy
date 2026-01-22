import { NestFactory } from '@nestjs/core';
import { ShippingModule } from './shipping.module';

async function bootstrap() {
  const app = await NestFactory.create(ShippingModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
