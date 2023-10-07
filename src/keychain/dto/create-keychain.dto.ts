import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKeychainDto {
  /**
   * Keychain name
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  /**
   * Keychain description
   */
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
}
