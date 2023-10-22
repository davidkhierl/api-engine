import { AuthService } from '@/auth/auth.service';
import { JwtPayload } from '@/auth/types/jwt-payload';
import { extractJwtFromSession } from '@/auth/utils/extract-jwt-from-session';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: extractJwtFromSession,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);
    const isValidSessionToken = await this.authService.validateSessionToken(
      req.session,
    );

    if (!user || !isValidSessionToken) throw new UnauthorizedException();

    delete user.password_hash;

    return user;
  }
}
