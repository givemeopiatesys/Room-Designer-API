import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Room Designer')
    .setDescription('API for room-designer app')
    .setVersion('1.0.0')
    .addTag('Shelkovich Yaroslav')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(
    join(__dirname, '..', process.env.FILE_UPLOAD_DESTINATION),
    {
      prefix: `/${process.env.FILE_UPLOAD_DESTINATION}/`,
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
