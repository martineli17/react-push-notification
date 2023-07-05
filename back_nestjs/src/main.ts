import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setVapidDetails } from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

  setVapidDetails(
    'http://localhost:3001',
    process.env.PUSH_NOTIFICATION_PUBLIC_KEY,
    process.env.PUSH_NOTIFICATION_PRIVATE_KEY,
  );
}
bootstrap();
