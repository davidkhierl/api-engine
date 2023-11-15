import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { KryptoService } from '@/krypto/krypto.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class KeyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kryptoService: KryptoService,
  ) {}

  /**
   * Create key
   */
  async create(user_id: string, createKeyDto: CreateKeyDto) {
    const { long, api_key, ...rest } = createKeyDto;

    const keychain = await this.prismaService.keychain.findUnique({
      where: {
        id: createKeyDto.keychain_id,
        user_id,
      },
    });

    if (!keychain)
      throw new NotFoundException(
        `Keychain ${createKeyDto.keychain_id} not found`,
      );

    const encrypted = await this._encryptProperty(api_key, long, user_id);

    return this.prismaService.key.create({
      data: { api_key: encrypted, ...rest },
    });
  }

  /**
   * Find all keys
   */
  findAll(user_id: string, paginationOptions?: PaginationOptions) {
    return this.prismaService.key.findMany({
      where: {
        keychain: {
          user_id,
        },
      },
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Find key
   */
  findOne(id: string, user_id: string) {
    return this.prismaService.key.findUniqueOrThrow({
      where: { id, keychain: { user_id } },
    });
  }

  /**
   * Update key
   */
  update(id: string, user_id: string, updateKeyDto: UpdateKeyDto) {
    return this.prismaService.key.update({
      where: { id, keychain: { user_id } },
      data: updateKeyDto,
    });
  }

  /**
   * Remove key
   */
  remove(id: string, user_id: string) {
    return this.prismaService.key.delete({
      where: { id, keychain: { user_id } },
    });
  }

  /**
   * Encrypt property
   */
  private async _encryptProperty(input: string, long: string, user_id: string) {
    const encryption = await this.prismaService.encryption.findUniqueOrThrow({
      where: { user_id },
    });
    const key = this.kryptoService.rebuildKey(long, encryption.short);
    const isValidKey = this.kryptoService.validateTestKey(key, encryption.test);
    if (!isValidKey)
      throw new BadUserInputException([
        {
          property: 'long',
          value: long,
          constraints: { invalidKey: 'Invalid encryption key' },
        },
      ]);
    return this.kryptoService.encrypt(input, key);
  }
}
