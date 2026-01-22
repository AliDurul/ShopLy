import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  process.title = 'Auth Service';
  const logger = new Logger('AuthBootstrap');
  const PORT = process.env.AUTH_PORT ?? 8001;

  // create a microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
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
  logger.log(`🚀 Auth Service is running on: http://localhost:${PORT}`);
}

bootstrap();
