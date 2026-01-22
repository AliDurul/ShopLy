import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AdminModule } from './admin.module';

async function bootstrap() {
  process.title = 'Admin Service';
  const logger = new Logger('AdminBootstrap');
  const PORT = process.env.ADMIN_PORT ?? 8010;

  // create a microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AdminModule,
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
  logger.log(`🚀 Admin Service is running on: http://localhost:${PORT}`);
}

bootstrap();
