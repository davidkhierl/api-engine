import { ApiProperty } from '@nestjs/swagger';
import { Key } from '@prisma/client';

export class KeyEntity implements Key {
  /**
   * Key id
   * @example 9131a8b6-5a54-43ce-898b-98cff6ff7ccf
   */
  id: string;
  /**
   * API Key
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   */
  api_key: string;
  /**
   * Key name
   * @example "My key"
   */
  @ApiProperty({ required: false })
  name: string | null;
  /**
   * Key description
   * @example "My project api key"
   */
  @ApiProperty({ required: false })
  description: string | null;
  /**
   * API key current request count
   */
  request_count: number = 0;
  /**
   * API key request limit
   * @example 500
   */
  request_limit: number = 0;
  /**
   * Key status
   */
  enabled: boolean = true;
  /**
   * Key created date
   */
  created_at: Date;
  /**
   * Key updated date
   */
  updated_at: Date;
  /**
   * Keychain id
   * @example 8ad8e1ce-04c2-4b36-9858-da27477ed83d
   */
  keychain_id: string;
}
