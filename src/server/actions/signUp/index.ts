'use server';

import { SignUpDto } from '@configs';
import { signUpValidationSchema } from '@modules/stores';
import { getErrorResponse } from '@server/utils';

export const signUp = async (values: SignUpDto) => {
  try {
    await signUpValidationSchema.validate(values);

    return { isError: false, message: 'Account created =)' };
  } catch (error: unknown) {
    return getErrorResponse(error);
  }
};
