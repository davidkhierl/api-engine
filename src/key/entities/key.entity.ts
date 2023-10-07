import { ApiProperty } from '@nestjs/swagger';
import { Key } from '@prisma/client';

export class KeyEntity implements Key {
  /**
   * Key id
   */
  @ApiProperty()
  id: string;
  /**
   * API Key
   */
  @ApiProperty()
  api_key: string;
  /**
   * Key name
   */
  @ApiProperty({ required: false, nullable: true })
  name: string | null;
  /**
   * Key description
   */
  @ApiProperty({ required: false, nullable: true })
  description: string | null;
  /**
   * API key current request count
   */
  @ApiProperty({ required: false, default: 0 })
  request_count: number;
  /**
   * API key request limit
   */
  @ApiProperty({ required: false, default: 0 })
  request_limit: number;
  /**
   * Key status
   */
  @ApiProperty({ required: false, default: false })
  enabled: boolean;
  /**
   * Key created date
   */
  @ApiProperty({ required: false })
  created_at: Date;
  /**
   * Key updated date
   */
  @ApiProperty({ required: false })
  updated_at: Date;
  /**
   * Keychain id
   */
  @ApiProperty()
  keychain_id: string;
}
