import { AuthError } from 'next-auth';

export const getErrorResponse = (error: unknown, response?: object) => {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return {
          isError: true,
          message: 'Invalid email or password!',
          ...response,
        };
      default:
        return {
          isError: true,
          message: 'Something went wrong!',
          ...response,
        };
    }
  }

  throw error;
};
