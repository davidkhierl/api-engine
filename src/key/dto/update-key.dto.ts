import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateKeyDto extends PartialType(
  PickType(CreateKeyDto, ['name', 'description'] as const),
) {}
