'use server';

import { Routes, SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { NASignIn } from '@server/nextAuth';
import { SignInErrorResponse } from '@server/utils';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    await NASignIn('credentials', {
      redirectTo: Routes.DASHBOARD,
      ...values,
    });
  } catch (error: unknown) {
    return SignInErrorResponse(error);
  }
};
