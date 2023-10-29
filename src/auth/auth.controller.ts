import { AuthService } from '@/auth/auth.service';

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Get auth user
   */
  @Get()
  async getAuthenticatedAppForUser() {}

  //
  // /**
  //  * Login user
  //  */
  // @Post('login')
  // // @UseGuards(LocalAuthGuard)
  // @ApiBody({
  //   type: AuthLoginDto,
  // })
  // async login(
  //   @User() user: UserEntity,
  //   @Session() session: ExpressSession,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<AuthDto> {
  //   const auth = await this.authService.authorize(user, session);
  //
  //   return auth;
  // }
  //
  // @Post('logout')
  // @ApiNoContentResponse()
  // @HttpCode(204)
  // async logout(
  //   @Session() session: ExpressSession,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   await this.authService.invalidateSession(session, {
  //     status: SessionTokenStatus.LOGOUT,
  //   });
  //
  //   res.clearCookie('sid');
  //   res.clearCookie('access_token');
  //   res.clearCookie('at_expiry');
  // }
  //
  // /**
  //  * Get new access token
  //  */
  // @Get('refresh')
  // @UseGuards(JwtRefreshAuthGuard)
  // async refreshToken(
  //   @User() user: UserEntity,
  //   @Session() session: ExpressSession,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<AuthDto> {
  //   const auth = await this.authService.refreshSessionToken(user, session);
  //   res.cookie('access_token', auth.access_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //   });
  //   res.cookie('at_expiry', auth.at_expiry, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //   });
  //
  //   return auth;
  // }
}
