import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { KeyModule } from './key/key.module';

@Module({
  imports: [PrismaModule, KeyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
