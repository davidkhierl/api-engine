import { KeyService } from '@/key/key.service';
import { Module } from '@nestjs/common';
import { KeychainController } from './keychain.controller';
import { KeychainService } from './keychain.service';

@Module({
  controllers: [KeychainController],
  providers: [KeychainService, KeyService],
})
export class KeychainModule {}
