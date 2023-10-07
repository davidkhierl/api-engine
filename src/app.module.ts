import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { KeyModule } from '@/key/key.module';
import { KeychainModule } from '@/keychain/keychain.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    KeychainModule,
    KeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
