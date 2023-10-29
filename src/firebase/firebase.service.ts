import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { credential } from 'firebase-admin';
import { App, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  public readonly app: App;
  public readonly auth: Auth;

  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = {
      type: this.configService.get<string>('FIREBASE_TYPE'),
      project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: this.configService.get<string>('FIREBASE_PRIVATE_KEY'),
      client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: this.configService.get<string>('FIREBASE_AUTH_URI'),
      token_uri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: this.configService.get<string>(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
      ),
      client_x509_cert_url: this.configService.get<string>(
        'FIREBASE_CLIENT_X509_CERT_URL',
      ),
      universe_domain: this.configService.get<string>(
        'FIREBASE_UNIVERSE_DOMAIN',
      ),
    } as ServiceAccount;

    this.app = initializeApp({ credential: credential.cert(firebaseConfig) });

    this.auth = getAuth();
  }
}
