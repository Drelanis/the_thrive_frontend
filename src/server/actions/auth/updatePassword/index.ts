'use server';

import { ErrorHints, MessageHints, NewPasswordDto } from '@configs';
import { newPasswordValidationSchema } from '@modules/stores';
import { updateUserPassword } from '@server/actions/user';
import { ErrorResponse, SuccessResponse } from '@server/utils';

import { checkEmailForExistence, checkTokenExpires } from './helpers';

export const updatePassword = async (
  values: NewPasswordDto,
  token?: string | null,
) => {
  try {
    if (!token) {
      throw new Error(ErrorHints.COMMON_ERROR);
    }

    await newPasswordValidationSchema.validate(values);

    const { newPassword } = values;

    const existingToken = await checkTokenExpires(token);

    const user = await checkEmailForExistence(existingToken.email);

    await updateUserPassword(
      user.id,
      existingToken.id,
      user.password!,
      newPassword,
    );

    return SuccessResponse({ message: MessageHints.PASSWORD_UPDATED });
  } catch (error) {
    return ErrorResponse({ error });
  }
};
