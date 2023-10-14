import { PaginationOptions } from '@/common/dto/pagination-options.dto';
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
  create(user_id: string, createKeychainDto: CreateKeychainDto) {
    return this.prismaService.keychain.create({
      data: { ...createKeychainDto, user_id },
    });
  }

  /**
   * Find all keychains
   */
  findAll(user_id: string, paginationOptions?: PaginationOptions) {
    return this.prismaService.keychain.findMany({
      where: {
        user_id,
      },
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: { created_at: 'asc' },
    });
  }

  /**
   * Find keychain
   */
  findOne(id: string, user_id: string) {
    return this.prismaService.keychain.findUniqueOrThrow({
      where: {
        id,
        user_id,
      },
    });
  }

  /**
   * Update keychain
   */
  update(id: string, user_id: string, updateKeychainDto: UpdateKeychainDto) {
    return this.prismaService.keychain.update({
      where: { id, user_id },
      data: updateKeychainDto,
    });
  }

  /**
   * Remove keychain
   */
  remove(id: string, user_id: string) {
    return this.prismaService.keychain.delete({ where: { id, user_id } });
  }
}
