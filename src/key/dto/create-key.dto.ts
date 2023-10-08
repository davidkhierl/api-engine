import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateKeyDto {
  /**
   * API Key
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  api_key: string;
  /**
   * Key name
   */
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;
  /**
   * Key description
   */
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
  /**
   * API key current request count
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  request_count?: number;
  /**
   * API key request limit
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  request_limit?: number;
  /**
   * Key status
   */
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  enabled?: boolean;
  // /**
  //  * Keychain id
  //  */
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // keychain_id: string;
}
