import { FirebaseService } from '@/firebase/firebase.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly firebase: FirebaseService) {}

  /**
   * Create user
   */
  async create(createUserDto: CreateUserDto) {
    return await this.firebase.auth.createUser(createUserDto);
  }
  //
  // /**
  //  * Find all users
  //  */
  // findAll() {
  //   return this.prisma.user.findMany();
  // }
  //
  // /**
  //  * Find user
  //  */
  // findOne(id: string) {
  //   return this.prisma.user.findUnique({ where: { id } });
  // }
  //
  // /**
  //  * Find user by email
  //  */
  // findOneByEmail(email: string) {
  //   return this.prisma.user.findUnique({ where: { email } });
  // }
  //
  // /**
  //  * Update user
  //  */
  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.prisma.user.update({ where: { id }, data: updateUserDto });
  // }
  //
  // /**
  //  * Remove user
  //  */
  // remove(id: string) {
  //   return this.prisma.user.delete({ where: { id } });
  // }
}
