'use server';

import { ResetPasswordDto } from '@configs';
import { sendPasswordResetEmail } from '@lib';
import { resetPasswordValidationSchema } from '@modules/stores';
import { ErrorResponse, SuccessResponse } from '@server/utils';

import { getUserByEmail } from '../../user';
import { upsertResetPasswordToken } from '../resetPasswordToken';

export const sendEmailForResetPassword = async (values: ResetPasswordDto) => {
  try {
    await resetPasswordValidationSchema.validate(values);

    const { email } = values;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error('Email not found!');
    }

    const passwordResetToken = await upsertResetPasswordToken(email);

    if (passwordResetToken) {
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
      );
    }

    return SuccessResponse({ message: 'Reset email sent!' });
  } catch (error: unknown) {
    return ErrorResponse({ error });
  }
};
