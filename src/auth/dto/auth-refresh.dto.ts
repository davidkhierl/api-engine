import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRefreshDto {
  /**
   * Refresh token
   */
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
