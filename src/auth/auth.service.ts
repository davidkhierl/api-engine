import { AuthToken } from '@/auth/types/auth.types';
import { JwtPayload } from '@/auth/types/jwt-payload';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const passwordMatches = await argon2.verify(user.password_hash, password);
      if (!passwordMatches) return null;

      delete user.password_hash;

      return user;
    }

    return null;
  }

  async generateToken(sub: string, username: string): Promise<AuthToken> {
    const { access_token, at_expiry } = this._signAccessToken(sub, username);
    const refresh_token = this._signRefreshToken(sub, username);

    return {
      access_token,
      at_expiry,
      refresh_token,
    };
  }

  async refreshToken(access_token: string): Promise<AuthToken> {
    const token = this.jwtService.verify<JwtPayload>(access_token, {
      secret: this.configService.get<string>('JWT_SECRET'),
      ignoreExpiration: true,
    });

    return this.generateToken(token.sub, token.username);
  }

  private _signAccessToken(
    sub: string,
    username: string,
  ): Omit<AuthToken, 'refresh_token'> {
    const payload = { sub, username };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    const at_expiry = this.jwtService.decode(access_token)['exp'];

    return { access_token, at_expiry };
  }

  private _signRefreshToken(sub: string, username: string): string {
    const payload = { sub, username };
    return this.jwtService.sign(payload, {
      expiresIn: '120d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }
}
