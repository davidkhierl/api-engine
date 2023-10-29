import { FirebaseError } from 'firebase-admin';
import type { FirebaseAuthError } from 'firebase-admin/lib/utils/error';

export function isFirebaseAuthError(
  error: FirebaseError,
): error is FirebaseAuthError {
  return error.code.startsWith('auth/');
}
