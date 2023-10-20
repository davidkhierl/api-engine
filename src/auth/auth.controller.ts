import { AuthService } from '@/auth/auth.service';
import { AuthResponseDto } from '@/auth/dto/auth-response.dto';
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
  Ip,
  Post,
  Session,
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
  async login(
    @User() user: UserEntity,
    @Ip() ip: string,
    @Session() session: ExpressSession,
  ): Promise<AuthResponseDto> {
    return this.authService.authorize(user, session, ip);
  }

  /**
   * Get new access token
   */
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @User() user: UserEntity,
    @Ip() ip: string,
    @Session() session: ExpressSession,
  ): Promise<AuthResponseDto> {
    return this.authService.refreshSessionToken(user, session, ip);
  }
}
