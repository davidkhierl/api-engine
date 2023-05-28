import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  /* -------------------------------------------------------------------------- */
  /*                                    nest                                    */
  /* -------------------------------------------------------------------------- */
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  /* -------------------------------------------------------------------------- */
  /*                                   prisma                                   */
  /* -------------------------------------------------------------------------- */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

void bootstrap();
