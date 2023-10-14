import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeychainKeyDto } from '@/keychain/dto/create-keychain-key.dto';
import { UpdateKeychainKeyDto } from '@/keychain/dto/update-keychain-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateKeychainDto } from './dto/create-keychain.dto';
import { UpdateKeychainDto } from './dto/update-keychain.dto';

@Injectable()
export class KeychainService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Create keychain
   */
  create(createKeychainDto: CreateKeychainDto) {
    return this.prismaService.keychain.create({ data: createKeychainDto });
  }

  /**
   * Find all keychains
   */
  findAll(options?: PaginationOptions) {
    return this.prismaService.keychain.findMany({
      skip: options.skip,
      take: options.take,
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Find keychain
   */
  findOne(id: string) {
    return this.prismaService.keychain.findUniqueOrThrow({ where: { id } });
  }

  /**
   * Update keychain
   */
  update(id: string, updateKeychainDto: UpdateKeychainDto) {
    return this.prismaService.keychain.update({
      where: { id },
      data: updateKeychainDto,
    });
  }

  /**
   * Remove keychain
   */
  remove(id: string) {
    return this.prismaService.keychain.delete({ where: { id } });
  }

  /**
   * Create keychain key
   */
  createKey(keychain_id: string, creatKeychainKeyDto: CreateKeychainKeyDto) {
    return this.prismaService.key.create({
      data: { ...creatKeychainKeyDto, keychain_id },
    });
  }

  /**
   * Find all keychain keys
   */
  findAllKeys(keychain_id: string, options?: PaginationOptions) {
    return this.prismaService.key.findMany({
      where: { keychain_id },
      skip: options.skip,
      take: options.take,
    });
  }

  /**
   * Find keychain key
   */
  findKey(keychain_id: string, key_id: string) {
    return this.prismaService.key.findUniqueOrThrow({
      where: { keychain_id, id: key_id },
    });
  }

  /**
   * Update a keychain key
   */
  updateKey(
    keychain_id: string,
    key_id: string,
    updateKeychainKeyDto: UpdateKeychainKeyDto,
  ) {
    return this.prismaService.key.update({
      where: { keychain_id, id: key_id },
      data: updateKeychainKeyDto,
    });
  }

  /**
   * Remove keychain key
   */
  removeKey(keychain_id: string, key_id: string) {
    return this.prismaService.key.delete({
      where: { keychain_id, id: key_id },
    });
  }
}
