import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ENABLE CORS ---
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from our frontend origin
    credentials: true, // Allow cookies to be sent (important for future features)
  });

  // --- ENABLE GLOBAL VALIDATION ---
  // This will automatically validate all incoming DTOs (like LoginInput)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
  console.log(`🚀 Backend application is running on: ${await app.getUrl()}`);
}
bootstrap();
