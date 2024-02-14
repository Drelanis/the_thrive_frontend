import { AuthError } from 'next-auth';

import { ErrorResponse } from './ErrorResponse';

export const SignInErrorResponse = (error: unknown) => {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return {
          isError: true,
          message: 'Invalid email or password!',
        };
      default:
        return {
          isError: true,
          message: 'Something went wrong!',
        };
    }
  }

  if (error instanceof Object) {
    return ErrorResponse({ error });
  }

  throw error;
};
