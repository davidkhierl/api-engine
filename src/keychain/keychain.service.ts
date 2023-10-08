import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateKeychainDto } from './dto/create-keychain.dto';
import { UpdateKeychainDto } from './dto/update-keychain.dto';

@Injectable()
export class KeychainService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createKeychainDto: CreateKeychainDto) {
    return this.prismaService.keychain.create({ data: createKeychainDto });
  }

  findAll(options?: PaginationOptions) {
    return this.prismaService.keychain.findMany({
      skip: options.skip,
      take: options.take,
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prismaService.keychain.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateKeychainDto: UpdateKeychainDto) {
    return this.prismaService.keychain.update({
      where: { id },
      data: updateKeychainDto,
    });
  }

  remove(id: string) {
    return this.prismaService.keychain.delete({ where: { id } });
  }

  createKey(keychain_id: string, createKeyDto: CreateKeyDto) {
    return this.prismaService.key.create({
      data: { ...createKeyDto, keychain_id },
    });
  }

  findAllKeys(keychain_id: string, options?: PaginationOptions) {
    return this.prismaService.key.findMany({
      where: { keychain_id },
      skip: options.skip,
      take: options.take,
    });
  }

  findKey(keychain_id: string, key_id: string) {
    return this.prismaService.key.findUniqueOrThrow({
      where: { keychain_id, id: key_id },
    });
  }

  updateKey(keychain_id: string, key_id: string, updateKeyDto: UpdateKeyDto) {
    return this.prismaService.key.update({
      where: { keychain_id, id: key_id },
      data: updateKeyDto,
    });
  }

  removeKey(keychain_id: string, key_id: string) {
    return this.prismaService.key.delete({
      where: { keychain_id, id: key_id },
    });
  }
}
