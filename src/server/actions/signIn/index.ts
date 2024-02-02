'use server';

import { SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { getErrorResponse } from '@server/utils';

import { signIn as NASignIn } from '@/src/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/src/routes';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    await NASignIn('credentials', {
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
      ...values,
    });
  } catch (error: unknown) {
    return getErrorResponse(error);
  }
};
