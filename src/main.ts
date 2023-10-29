import { AppModule } from '@/app.module';
import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import { FirebaseAuthErrorInterceptor } from '@/firebase/firebase-auth-error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /* -------------------------------------------------------------------------- */
  /*                                    nest                                    */
  /* -------------------------------------------------------------------------- */
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number | undefined>('PORT') ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors) => {
        return new BadUserInputException(validationErrors);
      },
    }),
  );
  app.useGlobalInterceptors(new FirebaseAuthErrorInterceptor());

  /* -------------------------------------------------------------------------- */
  /*                                   swagger                                  */
  /* -------------------------------------------------------------------------- */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Engine')
    .setDescription('API Engine')
    .setVersion('1.0')
    .addTag('Default')
    .addTag('Users')
    .addTag('Encryption')
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
