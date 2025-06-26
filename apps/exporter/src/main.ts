import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002); // Port for the exporter service
  console.log(`🚀 Exporter application is running on: ${await app.getUrl()}`);
}
bootstrap();
