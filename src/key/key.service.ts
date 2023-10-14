import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create key
   */
  async create(user_id: string, createKeyDto: CreateKeyDto) {
    const keychain = await this.prisma.keychain.findUnique({
      where: {
        id: createKeyDto.keychain_id,
        user_id,
      },
    });

    if (!keychain)
      throw new NotFoundException(
        `Keychain ${createKeyDto.keychain_id} not found`,
      );

    return this.prisma.key.create({
      data: createKeyDto,
    });
  }

  /**
   * Find all keys
   */
  findAll(user_id: string, paginationOptions?: PaginationOptions) {
    return this.prisma.key.findMany({
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
   * Find all keychain keys
   */
  findAllByKeychain(
    user_id: string,
    keychain_id: string,
    paginationOptions?: PaginationOptions,
  ) {
    return this.prisma.key.findMany({
      where: {
        keychain_id,
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
    return this.prisma.key.findUniqueOrThrow({
      where: { id, keychain: { user_id } },
    });
  }

  /**
   * Update key
   */
  update(id: string, user_id: string, updateKeyDto: UpdateKeyDto) {
    return this.prisma.key.update({
      where: { id, keychain: { user_id } },
      data: updateKeyDto,
    });
  }

  /**
   * Remove key
   */
  remove(id: string, user_id: string) {
    return this.prisma.key.delete({ where: { id, keychain: { user_id } } });
  }
}
