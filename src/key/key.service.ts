import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService) {}

  create(keychain_id: string, createKeyDto: CreateKeyDto) {
    return this.prisma.key.create({
      data: { ...createKeyDto, keychain_id },
    });
  }

  findAll(options?: PaginationOptions) {
    return this.prisma.key.findMany({
      skip: options.skip,
      take: options.take,
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.key.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateKeyDto: UpdateKeyDto) {
    return this.prisma.key.update({
      where: { id },
      data: updateKeyDto,
    });
  }

  remove(id: string) {
    return this.prisma.key.delete({ where: { id } });
  }
}
