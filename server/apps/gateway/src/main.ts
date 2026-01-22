import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Gateway Service';

  const logger = new Logger('GatewayBootstrap');
  const app = await NestFactory.create(GatewayModule);

  app.enableShutdownHooks();

  const PORT = process.env.GATEWAY_PORT ?? 8000;

  await app.listen(PORT, () => {
    logger.log(`🚀 Gateway Service is running on: http://localhost:${PORT}`);
  });
}

bootstrap();
