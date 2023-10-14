import { AppModule } from '@/app.module';
import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import { PrismaClientExceptionFilter } from '@/prisma/prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /* -------------------------------------------------------------------------- */
  /*                                    nest                                    */
  /* -------------------------------------------------------------------------- */
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number | undefined>('PORT') ?? 3000;

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors) => {
        return new BadUserInputException(validationErrors);
      },
    }),
  );

  /* -------------------------------------------------------------------------- */
  /*                                   swagger                                  */
  /* -------------------------------------------------------------------------- */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Engine')
    .setDescription('API Engine')
    .setVersion('1.0')
    .addTag('Default')
    .addTag('Users')
    .addTag('Keychains')
    .addTag('Keys')
    .addServer('http://localhost:4000', 'API Engine')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  /* -------------------------------------------------------------------------- */
  /*                                   express                                  */
  /* -------------------------------------------------------------------------- */

  await app.listen(port ?? 3000);
}

void bootstrap();
