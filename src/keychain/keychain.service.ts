import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { KeyService } from '@/key/key.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateKeychainDto } from './dto/create-keychain.dto';
import { UpdateKeychainDto } from './dto/update-keychain.dto';

@Injectable()
export class KeychainService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly keyService: KeyService,
  ) {}

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

  findAllKeys(id: string, options?: PaginationOptions) {
    return this.keyService.findAllByKeychain(id, options);
  }
}
