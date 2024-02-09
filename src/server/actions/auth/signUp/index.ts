'use server';

import { SignUpDto } from '@configs';
import { sendVerificationEmail } from '@lib';
import { signUpValidationSchema } from '@modules/stores';
import { createUser } from '@server/actions/user';
import { ErrorResponse, SuccessResponse } from '@server/utils';

import { upsertVerificationToken } from '../verificationToken';

export const signUp = async (values: SignUpDto) => {
  try {
    const data = await signUpValidationSchema.validate(values);

    await createUser(data);

    const verificationToken = await upsertVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return SuccessResponse({ message: 'Confirmation email sent!' });
  } catch (error: unknown) {
    return ErrorResponse({ error });
  }
};
