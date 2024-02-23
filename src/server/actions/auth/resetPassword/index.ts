'use server';

import { ErrorHints, MessageHints, ResetPasswordDto } from '@configs';
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
      throw new Error(ErrorHints.EMAIL_NOT_FOUND);
    }

    const passwordResetToken = await upsertResetPasswordToken(email);

    if (passwordResetToken) {
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
      );
    }

    return SuccessResponse({ message: MessageHints.RESET_EMAIL });
  } catch (error: unknown) {
    return ErrorResponse({ error });
  }
};
