import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKeychainDto {
  /**
   * Keychain name
   * @example  "My keychain"
   */
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   * Keychain description
   * @example "My project keychain"
   */
  @IsString()
  @IsOptional()
  description?: string;
}
