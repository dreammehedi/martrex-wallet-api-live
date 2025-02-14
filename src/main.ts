import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });

    // Enable Global Validation Pipes
    app.useGlobalPipes(new ValidationPipe());

    // Swagger API Documentation (only in development mode)
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Crypto API')
        .setDescription('Crypto API description')
        .setVersion('1.0')
        .addTag('api')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('swagger', app, document);
    }

    const port = process.env.PORT || 3104;
    await app.listen(port);
    console.log(`🚀 API started on port ${port}`);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
}

bootstrap();
