import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create user
   */
  async create(createUserDto: CreateUserDto) {
    const { password, name, email } = createUserDto;

    const password_hash = await argon2.hash(password);

    return this.prisma.user.create({ data: { name, email, password_hash } });
  }

  /**
   * Find all users
   */
  findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Find user
   */
  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Find user by email
   */
  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Update user
   */
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  /**
   * Remove user
   */
  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
