import { KryptoService } from '@/krypto/krypto.service';
import { Injectable } from '@nestjs/common';
import { CreateEncryptionDto } from './dto/create-encryption.dto';
import { UpdateEncryptionDto } from './dto/update-encryption.dto';

@Injectable()
export class EncryptionService {
  constructor(private readonly kryptoService: KryptoService) {}

  create(user_id?: string, createEncryptionDto?: CreateEncryptionDto) {
    console.log(user_id, createEncryptionDto);
    const key = this.kryptoService.generateKey();
    const message = 'Hello World!';
    const encrypted = this.kryptoService.encrypt(message, key);
    const decrypted = this.kryptoService.decrypt(encrypted, key);
    const destructured = this.kryptoService.destructureKey(key);
    const rebuildKey = this.kryptoService.rebuildKey(
      destructured.long,
      destructured.short,
    );
    return {
      key,
      message,
      encrypted,
      decrypted,
      matched: message === decrypted,
      destructured,
      rebuildKey,
      rebuildMatched: rebuildKey === key,
    };
  }

  findAll() {
    return `This action returns all encryption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encryption`;
  }

  update(id: number, updateEncryptionDto: UpdateEncryptionDto) {
    console.log(updateEncryptionDto);
    return `This action updates a #${id} encryption`;
  }

  remove(id: number) {
    return `This action removes a #${id} encryption`;
  }
}
