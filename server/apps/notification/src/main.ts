import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  process.title = 'Notification Service';
  const logger = new Logger('NotificationBootstrap');
  const PORT = process.env.NOTIFICATION_PORT ?? 8009;

  // create a microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
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
  logger.log(`🚀 Notification Service is running on: http://localhost:${PORT}`);
}

bootstrap();
