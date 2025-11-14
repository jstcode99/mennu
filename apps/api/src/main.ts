import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@modules/commons/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());


  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}

bootstrap();
