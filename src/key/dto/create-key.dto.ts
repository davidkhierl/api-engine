import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateKeyDto {
  /**
   * API Key
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   */
  @IsString()
  @IsNotEmpty()
  api_key: string;
  /**
   * Key name
   * @example "My key"
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  /**
   * Key description
   * @example "My project api key"
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
  /**
   * API key current request count
   */
  @IsNumber()
  @IsOptional()
  request_count?: number = 0;
  /**
   * API key request limit
   * @example 500
   */
  @IsNumber()
  @IsOptional()
  request_limit?: number = 0;
  /**
   * Key status
   */
  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true;
  /**
   * Keychain id
   * @example e0ba4448-d6f3-4e83-8e2b-2760a8be3546
   */
  @IsUUID()
  keychain_id: string;
}
