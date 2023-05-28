import { KeyEntity } from '@/key/entities/key.entity';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeyDto extends PickType(KeyEntity, ['name']) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
