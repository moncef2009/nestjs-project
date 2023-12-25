import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('marcketplace')
    .setDescription('marcket place API documentation')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'JWT bearer Authentication token',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'marcket place API',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: false,
    },
  });

  await app.listen(3000);
}
bootstrap();
