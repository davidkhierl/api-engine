import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  /**
   * Login email
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  /**
   * Login password
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
