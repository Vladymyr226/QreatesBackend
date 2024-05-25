import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(8080, '0.0.0.0');
  const port = process.env.APP_ADDR.split(':').pop();
  console.log(`\nApp started on port ${port}`);
}
bootstrap();
