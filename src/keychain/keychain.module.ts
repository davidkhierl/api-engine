import { KeychainController } from '@/keychain/keychain.controller';
import { KeychainService } from '@/keychain/keychain.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [KeychainController],
  providers: [KeychainService],
})
export class KeychainModule {}
