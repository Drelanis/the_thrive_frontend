'use server';

import { SigninDto } from '@configs';
import { sendVerificationEmail } from '@lib';
import { signInValidationSchema } from '@modules/stores';
import { signIn as NASignIn } from '@root/src/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@root/src/routes';
import { getUserByEmail } from '@server/actions/user';
import { getErrorResponse } from '@server/utils';

import { generateVerificationToken } from '../verificationToken';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    const existingUser = await getUserByEmail(values.email);

    if (!existingUser?.emailVerified) {
      const verificationToken = await generateVerificationToken(values.email);

      await sendVerificationEmail(values.email, verificationToken?.token || '');

      return {
        isError: true,
        message: 'Email not verified. Please confirm your email address.',
      };
    }

    await NASignIn('credentials', {
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
      ...values,
    });
  } catch (error: unknown) {
    return getErrorResponse(error);
  }
};
