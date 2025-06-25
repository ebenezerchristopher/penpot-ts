import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // In a real scenario, we would add CORS, etc. here
  await app.listen(3001); // Using port 3001 to avoid conflicts with frontend
  console.log(`🚀 Backend application is running on: ${await app.getUrl()}`);
}
bootstrap();
