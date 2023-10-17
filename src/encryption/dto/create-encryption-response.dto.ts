import { EncryptionEntity } from '@/encryption/entities/encryption.entity';

export class CreateEncryptionResponseDto extends EncryptionEntity {
  long: string;
}
