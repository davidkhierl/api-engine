import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRefreshDto {
  /**
   * Refresh token
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}
