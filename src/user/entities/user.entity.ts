import { User } from '@prisma/client';

export class UserEntity implements Omit<User, 'password_hash'> {
  /**
   * User ID
   */
  id: string;

  /**
   * User email
   */
  email: string;

  /**
   * User name
   */
  name: string;

  /**
   * User created date
   */
  createdAt: Date;

  /**
   * User updated date
   */
  updatedAt: Date;
}
