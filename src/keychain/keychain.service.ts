import { Injectable } from '@nestjs/common';

@Injectable()
export class KeychainService {
  constructor() {}
  //
  // /**
  //  * Create keychain
  //  */
  // create(user_id: string, createKeychainDto: CreateKeychainDto) {
  //   return this.prismaService.keychain.create({
  //     data: { ...createKeychainDto, user_id },
  //   });
  // }
  //
  // /**
  //  * Find all keychains
  //  */
  // findAll(user_id: string, paginationOptions?: PaginationOptions) {
  //   return this.prismaService.keychain.findMany({
  //     where: {
  //       user_id,
  //     },
  //     skip: paginationOptions.skip,
  //     take: paginationOptions.take,
  //     orderBy: { created_at: 'asc' },
  //   });
  // }
  //
  // /**
  //  * Find all keychain keys
  //  */
  // async findAllKeychainKeys(
  //   id: string,
  //   user_id: string,
  //   paginationOptions?: PaginationOptions,
  // ) {
  //   const keychain = await this.prismaService.keychain.findUniqueOrThrow({
  //     where: { id, user_id },
  //     include: {
  //       keys: {
  //         skip: paginationOptions.skip,
  //         take: paginationOptions.take,
  //         orderBy: { created_at: 'asc' },
  //       },
  //     },
  //   });
  //
  //   return keychain.keys;
  // }
  //
  // /**
  //  * Find keychain
  //  */
  // findOne(id: string, user_id: string) {
  //   return this.prismaService.keychain.findUniqueOrThrow({
  //     where: {
  //       id,
  //       user_id,
  //     },
  //   });
  // }
  //
  // /**
  //  * Update keychain
  //  */
  // update(id: string, user_id: string, updateKeychainDto: UpdateKeychainDto) {
  //   return this.prismaService.keychain.update({
  //     where: { id, user_id },
  //     data: updateKeychainDto,
  //   });
  // }
  //
  // /**
  //  * Remove keychain
  //  */
  // remove(id: string, user_id: string) {
  //   return this.prismaService.keychain.delete({ where: { id, user_id } });
  // }
}
