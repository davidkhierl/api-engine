import { CreateKeychainDto } from '@/keychain/dto/create-keychain.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateKeychainDto extends PartialType(CreateKeychainDto) {}
