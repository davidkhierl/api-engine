import { KeyService } from '@/key/key.service';
import { KryptoModule } from '@/krypto/krypto.module';
import { Module } from '@nestjs/common';
import { KeychainController } from './keychain.controller';
import { KeychainService } from './keychain.service';

@Module({
  imports: [KryptoModule],
  controllers: [KeychainController],
  providers: [KeychainService, KeyService],
})
export class KeychainModule {}
