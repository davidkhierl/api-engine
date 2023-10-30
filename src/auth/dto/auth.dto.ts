import { AuthToken } from '@/auth/types/auth.types';

/**
 * Auth response object
 */
export class AuthDto implements AuthToken {
  /**
   * User data
   */
  // user: UserEntity;
  /**
   * Access token
   */
  access_token: string;

  /**
   * Access token expiration
   */
  at_expiry: number;
}
