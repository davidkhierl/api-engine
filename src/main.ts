import { AppModule } from '@/app.module';
import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import metadata from '@/metadata';
import { PrismaClientExceptionFilter } from '@/prisma/prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import connectPgSimple = require('connect-pg-simple');

async function bootstrap() {
  /* -------------------------------------------------------------------------- */
  /*                                    nest                                    */
  /* -------------------------------------------------------------------------- */
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });

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
    .addTag('Encryption')
    .addTag('Keychains')
    .addTag('Keys')
    .addServer('http://localhost:4000', 'API Engine')
    .addBearerAuth()
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  /* -------------------------------------------------------------------------- */
  /*                                   express                                  */
  /* -------------------------------------------------------------------------- */

  const pgSession = connectPgSimple(session);

  app.use(
    session({
      store: new pgSession({
        tableName: 'sessions',
        disableTouch: true,
      }),
      name: 'sid',
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      cookie: {
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // 120d
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
      saveUninitialized: false,
    }),
  );

  await app.listen(port ?? 3000);
}

void bootstrap();
