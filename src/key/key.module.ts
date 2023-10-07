import { KeyController } from '@/key/key.controller';
import { KeyService } from '@/key/key.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}
