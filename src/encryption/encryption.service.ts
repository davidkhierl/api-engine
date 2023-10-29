import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  constructor() {}
  //
  // async create(user_id?: string) {
  //   const { long, short, test } = this._createEncryptionKey();
  //   const encryption = await this.prismaService.encryption.create({
  //     data: { user_id, short, test },
  //   });
  //
  //   return { long, ...encryption };
  // }
  //
  // findOne(user_id: string) {
  //   return this.prismaService.encryption.findUniqueOrThrow({
  //     where: { user_id },
  //   });
  // }
  //
  // remove(user_id: string) {
  //   return this.prismaService.encryption.delete({ where: { user_id } });
  // }
  //
  // private _createEncryptionKey() {
  //   const key = this.kryptoService.generateKey();
  //   const test = this.kryptoService.encrypt(
  //     this.kryptoService.generateTestString(16),
  //     key,
  //   );
  //   const { short, long } = this.kryptoService.destructureKey(key);
  //
  //   return { long, short, test };
  // }
}
