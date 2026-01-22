import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
