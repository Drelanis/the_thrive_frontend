'use server';

import { SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { getErrorResponse } from '@server/utils';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    return { isError: false, message: 'Welcome =)' };
  } catch (error: unknown) {
    return getErrorResponse(error);
  }
};
