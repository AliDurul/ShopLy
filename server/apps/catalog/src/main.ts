import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Catalog Service';
  const logger = new Logger('CatalogBootstrap');
  const PORT = process.env.CATALOG_PORT ?? 8003;

  // create an microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
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
  logger.log(`🚀 Catalog Service is running on: http://localhost:${PORT}`);
}

bootstrap();
