import { BadUserInputException } from '@/common/exceptions/bad-user-input.exception';
import { isFirebaseAuthError } from '@/firebase/utils/is-firebase-auth-error';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class FirebaseAuthErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((error) => {
        if (isFirebaseAuthError(error)) {
          switch (error.code) {
            case 'auth/email-already-exists':
              throw new BadUserInputException([
                {
                  property: 'email',
                  value: req.body.email,
                  constraints: { email: error.message },
                },
              ]);

            default:
              throw error;
          }
        }

        throw error;
      }),
    );
  }
}
