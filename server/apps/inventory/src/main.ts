import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  process.title = 'Inventory Service';
  const logger = new Logger('InventoryBootstrap');
  const PORT = process.env.INVENTORY_PORT ?? 8005;

  // create a microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(PORT),
      },
    },
  );

  app.enableShutdownHooks();

  await app.listen();
  logger.log(`🚀 Inventory Service is running on: http://localhost:${PORT}`);
}

bootstrap();
