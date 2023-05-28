import { Key } from '@prisma/client';

export class KeyEntity implements Key {
  /**
   * Key ID
   */
  id: string;

  /**
   * Key name
   */
  name: string;

  /**
   * Key user id
   */
  userId: string | null;

  /**
   * Key created date
   */
  createdAt: Date;

  /**
   * Key updated date
   */
  updatedAt: Date;
}
