import { ApiProperty } from '@nestjs/swagger';
import { Keychain } from '@prisma/client';

export class KeychainEntity implements Keychain {
  /**
   * Keychain ID
   */
  @ApiProperty()
  id: string;
  /**
   * Keychain name
   */
  @ApiProperty()
  name: string;
  /**
   * Keychain description
   */
  @ApiProperty({ required: false, nullable: true })
  description: string | null;
  /**
   * Keychain created date
   */
  @ApiProperty({ required: false })
  created_at: Date;
  /**
   * Keychain updated date
   */
  @ApiProperty({ required: false })
  updated_at: Date;
}
