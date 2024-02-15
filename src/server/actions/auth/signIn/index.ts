'use server';

import { Providers, SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { getUserByEmail } from '@server/actions/user';
import { NASignIn } from '@server/nextAuth';
import { SignInErrorResponse } from '@server/utils';

import { checkEmailVerification } from '../verificationToken';

import { handleTwoFactorAuth } from './helpers';

export const signIn = async (values: SigninDto) => {
  try {
    const { email, twoFactorCode } = values;

    await signInValidationSchema.validate(values);

    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('Email does not exist!');
    }

    await checkEmailVerification(email);

    const twoFactoResponse = await handleTwoFactorAuth(
      user.id,
      user?.isTwoFactorEnabled,
      user.email,
      twoFactorCode,
    );

    if (twoFactoResponse) {
      return twoFactoResponse;
    }

    await NASignIn(Providers.CREDENTIALS, {
      ...values,
    });
  } catch (error: unknown) {
    return SignInErrorResponse(error);
  }
};
