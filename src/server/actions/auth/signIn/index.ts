'use server';

import { Providers, SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { NASignIn } from '@server/nextAuth';
import { SignInErrorResponse } from '@server/utils';

import { checkEmailVerification } from '../verificationToken';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    await checkEmailVerification(values.email);

    await NASignIn(Providers.CREDENTIALS, {
      ...values,
    });
  } catch (error: unknown) {
    return SignInErrorResponse(error);
  }
};
