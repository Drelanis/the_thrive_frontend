'use server';

import { SigninDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';

export const signIn = async (values: SigninDto) => {
  try {
    await signInValidationSchema.validate(values);

    return { isError: false, message: 'Welcome =)' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;

      return { isError: true, message: errorMessage };
    }
  }
};
