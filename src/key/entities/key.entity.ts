import { ApiProperty } from '@nestjs/swagger';

export class KeyEntity {
  /**
   * Key id
   * @example 9131a8b6-5a54-43ce-898b-98cff6ff7ccf
   */
  id: string;
  /**
   * Encrypted API Key
   * @example v1.aesgcm256.7e5c6df8.PSWgDYVu6IIhNou3.RcrLyyb73-IRoNoa287hqooyjwoaCgipc39_VFpl0Q==
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
