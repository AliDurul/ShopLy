import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  process.title = 'User Service';
  const logger = new Logger('UserBootstrap');
  const PORT = process.env.USER_PORT ?? 8002;

  // create a microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
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
  logger.log(`🚀 User Service is running on: http://localhost:${PORT}`);
}

bootstrap();
