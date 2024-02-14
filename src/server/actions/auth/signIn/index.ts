'use server';

import { Providers, SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { getUserByEmail } from '@server/actions/user';
import { NASignIn } from '@server/nextAuth';
import { SignInErrorResponse } from '@server/utils';

import { checkEmailVerification } from '../verificationToken';

import {
  twoFactorCodeVerification,
  twoFactorDataVerification,
} from './helpers';

export const signIn = async (values: SigninDto) => {
  try {
    const { email, twoFactorCode } = values;

    await signInValidationSchema.validate(values);

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error('Email does not exist!');
    }

    await checkEmailVerification(email);

    if (existingUser.isTwoFactorEnabled && !twoFactorCode) {
      const response = await twoFactorDataVerification(existingUser.id, email);

      if (response) {
        return response;
      }
    }

    if (twoFactorCode) {
      await twoFactorCodeVerification(email, twoFactorCode);
    }

    await NASignIn(Providers.CREDENTIALS, {
      ...values,
    });
  } catch (error: unknown) {
    return SignInErrorResponse(error);
  }
};
