import { AuthService } from '@/auth/auth.service';
import { AuthRefreshDto } from '@/auth/dto/auth-refresh.dto';
import { AuthResponseDto } from '@/auth/dto/auth-response.dto';
import { AuthDto } from '@/auth/dto/auth.dto';
import { JwtRefreshAuthGuard } from '@/auth/guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserEntity } from '@/user/entities/user.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login user
   */
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: AuthDto,
  })
  @Post('login')
  async login(@User() user: UserEntity): Promise<AuthResponseDto> {
    return await this.authService.generateToken(user.id, user.email);
  }

  /**
   * Get new access token
   */
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @Body() authRefreshDto: AuthRefreshDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.refreshToken(authRefreshDto.access_token);
  }
}
