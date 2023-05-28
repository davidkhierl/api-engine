import { AppModule } from '@/app.module';
import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import { PrismaClientExceptionFilter } from '@/prisma/prisma-client-exception.filter';
import { PrismaService } from '@/prisma/prisma.service';
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
  /*                                   prisma                                   */
  /* -------------------------------------------------------------------------- */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /* -------------------------------------------------------------------------- */
  /*                                   swagger                                  */
  /* -------------------------------------------------------------------------- */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Engine')
    .setDescription('API Engine')
    .setVersion('1.0')
    .addTag('Default')
    .addTag('Keychains')
    .addTag('Users')
    .addServer('http://localhost:{port}', 'API Engine', {
      protocol: {
        enum: ['http', 'https'],
        default: 'http',
      },
      port: {
        enum: [port],
        default: port,
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  /* -------------------------------------------------------------------------- */
  /*                                   express                                  */
  /* -------------------------------------------------------------------------- */

  await app.listen(port ?? 3000);
}

void bootstrap();
