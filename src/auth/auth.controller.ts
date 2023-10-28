import { AuthService } from '@/auth/auth.service';
import { AuthLoginDto } from '@/auth/dto/auth-login.dto';
import { AuthDto } from '@/auth/dto/auth.dto';
import { JwtRefreshAuthGuard } from '@/auth/guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { ExpressSession } from '@/types/express-session/express-session.types';
import { UserEntity } from '@/user/entities/user.entity';

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { SessionTokenStatus } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login user
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: AuthLoginDto,
  })
  async login(
    @User() user: UserEntity,
    @Session() session: ExpressSession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthDto> {
    const auth = await this.authService.authorize(user, session);

    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie('at_expiry', auth.at_expiry, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return auth;
  }

  @Post('logout')
  @ApiNoContentResponse()
  @HttpCode(204)
  async logout(
    @Session() session: ExpressSession,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.invalidateSession(session, {
      status: SessionTokenStatus.LOGOUT,
    });

    res.clearCookie('sid');
    res.clearCookie('access_token');
    res.clearCookie('at_expiry');
  }

  /**
   * Get new access token
   */
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @User() user: UserEntity,
    @Session() session: ExpressSession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthDto> {
    const auth = await this.authService.refreshSessionToken(user, session);
    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie('at_expiry', auth.at_expiry, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return auth;
  }
}
