import { KryptoModule } from '@/krypto/krypto.module';
import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [KryptoModule],
  controllers: [EncryptionController],
  providers: [EncryptionService],
})
export class EncryptionModule {}
