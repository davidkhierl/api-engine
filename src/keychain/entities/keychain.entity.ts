import { Keychain } from '@prisma/client';

export class KeychainEntity implements Keychain {
  /**
   * Key ID
   */
  id: string;

  /**
   * Key name
   */
  name: string;

  // /**
  //  * Key user id
  //  */
  // userId: string | null;

  /**
   * Key created date
   */
  createdAt: Date;

  /**
   * Key updated date
   */
  updatedAt: Date;
}
