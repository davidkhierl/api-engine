import { UserEntity } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  // getCurrentUser(@Req() req: Request): UserEntity {
  //   return req.user;
  // }
  getCurrentUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  /**
   * Get user by id
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
}
