import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create key
   */
  create(createKeyDto: CreateKeyDto) {
    return this.prisma.key.create({
      data: createKeyDto,
    });
  }

  /**
   * Find all keys
   */
  findAll(options?: PaginationOptions) {
    return this.prisma.key.findMany({
      skip: options.skip,
      take: options.take,
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Find key
   */
  findOne(id: string) {
    return this.prisma.key.findUniqueOrThrow({ where: { id } });
  }

  /**
   * Update key
   */
  update(id: string, updateKeyDto: UpdateKeyDto) {
    return this.prisma.key.update({
      where: { id },
      data: updateKeyDto,
    });
  }

  /**
   * Remove key
   */
  remove(id: string) {
    return this.prisma.key.delete({ where: { id } });
  }
}
