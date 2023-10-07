import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateKeyDto extends PartialType(CreateKeyDto) {}
