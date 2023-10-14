import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateKeyDto extends PartialType(
  OmitType(CreateKeyDto, ['api_key', 'keychain_id'] as const),
) {}
