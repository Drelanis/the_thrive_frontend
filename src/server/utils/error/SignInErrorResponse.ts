import { ErrorHints } from '@configs';
import { AuthError } from 'next-auth';

import { ErrorResponse } from './ErrorResponse';

export const SignInErrorResponse = (error: unknown) => {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return {
          isError: true,
          isTwoFactor: false,
          message: ErrorHints.INVALID_CREDENTIALS,
        };
      default:
        return {
          isError: true,
          isTwoFactor: false,
          message: ErrorHints.COMMON_ERROR,
        };
    }
  }

  if (error instanceof Object) {
    return ErrorResponse({ error });
  }

  throw error;
};
