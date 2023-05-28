import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeychainDto } from '@/keychain/dto/create-keychain.dto';
import { UpdateKeychainDto } from '@/keychain/dto/update-keychain.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeychainService {
  constructor(private readonly prisma: PrismaService) {}

  create(createKeyDto: CreateKeychainDto) {
    return this.prisma.keychain.create({ data: { name: createKeyDto.name } });
  }

  findAll(options?: PaginationOptions) {
    return this.prisma.keychain.findMany({
      skip: options.skip,
      take: options.take,
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.keychain.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateKeyDto: UpdateKeychainDto) {
    return this.prisma.keychain.update({
      where: { id },
      data: { name: updateKeyDto.name },
    });
  }

  remove(id: string) {
    return this.prisma.keychain.delete({ where: { id } });
  }
}
