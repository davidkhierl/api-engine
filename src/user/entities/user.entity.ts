import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  /**
   * User ID
   */
  @ApiProperty()
  id: string;
  /**
   * User email
   */
  @ApiProperty()
  email: string;
  /**
   * User name
   */
  @ApiProperty()
  name: string;
  /**
   * User created date
   */
  @ApiProperty()
  created_at: Date;
  /**
   * User updated date
   */
  @ApiProperty()
  updated_at: Date;
}
