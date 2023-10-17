import { KeyController } from '@/key/key.controller';
import { KeyService } from '@/key/key.service';
import { KryptoModule } from '@/krypto/krypto.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [KryptoModule],
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}
