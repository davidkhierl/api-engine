import { Module } from '@nestjs/common';
import { KeychainController } from './keychain.controller';
import { KeychainService } from './keychain.service';

@Module({
  controllers: [KeychainController],
  providers: [KeychainService],
})
export class KeychainModule {}
