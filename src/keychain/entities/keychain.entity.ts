import { ApiProperty } from '@nestjs/swagger';
import { Keychain } from '@prisma/client';

export class KeychainEntity implements Keychain {
  /**
   * Keychain ID
   * @example 97146ddb-de2f-4283-9470-0a56e723f521
   */
  id: string;
  /**
   * Keychain name
   * @example  "My keychain"
   */
  @ApiProperty()
  name: string;
  /**
   * Keychain description
   * @example "My project keychain"
   */
  @ApiProperty({ required: false })
  description: string | null;
  /**
   * Keychain created date
   */
  created_at: Date;
  /**
   * Keychain updated date
   */
  updated_at: Date;
}
