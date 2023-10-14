import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateKeychainKeyDto extends OmitType(CreateKeyDto, [
  'keychain_id',
] as const) {}
