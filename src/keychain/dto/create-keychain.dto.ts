import { KeychainEntity } from '@/keychain/entities/keychain.entity';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeychainDto extends PickType(KeychainEntity, ['name']) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
