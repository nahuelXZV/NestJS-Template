import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS_OPTIONS } from './common/constants';
import * as morgan from 'morgan';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')); // Log all requests to the console
  app.setGlobalPrefix('api'); // Set the global prefix for all routes
  app.enableCors(CORS_OPTIONS); // Enable CORS
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ); // Enable validation

  const reflector = app.get('Reflector');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)); // Enable transformation

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const title: string = configService.get('APP_NAME');
  const url = configService.get('APP_URL');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title)
    .setDescription('Template para iniciar un proyecto con NestJS, TypeORM, Postgres, Swagger, Passport, JWT, Docker, etc.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${url}`);
}
bootstrap();
