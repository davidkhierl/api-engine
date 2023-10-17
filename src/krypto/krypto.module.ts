import { Module } from '@nestjs/common';
import { KryptoService } from './krypto.service';

@Module({
  providers: [KryptoService],
  exports: [KryptoService],
})
export class KryptoModule {}
