import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }
  ));
  const swaggerConfig = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('API para gerenciamento de produtos e pedidos')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const swaggerDocument = SwaggerModule.createDocument(
  app,
  swaggerConfig,
);

SwaggerModule.setup('api', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
