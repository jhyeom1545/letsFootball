import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/httpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    credentials: true,
    origin: [`'${process.env.ALLOW_ORIGIN_URL}'`],
  });
  new ValidationPipe({
    transform: true,
    enableDebugMessages: true,
    exceptionFactory(errors) {
      const message = Object.values(errors[0].constraints);
      throw new BadRequestException(message[0]);
    },
  });
  const config = new DocumentBuilder()
    .setTitle('letsFootball')
    .setDescription('Rest API를 사용한 프로젝트 입니다.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
