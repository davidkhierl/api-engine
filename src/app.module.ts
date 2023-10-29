import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { KeyModule } from '@/key/key.module';
import { KeychainModule } from '@/keychain/keychain.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';
import { FirebaseModule } from './firebase/firebase.module';
import { KryptoModule } from './krypto/krypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AuthModule,
    UserModule,
    KeychainModule,
    KeyModule,
    KryptoModule,
    EncryptionModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
