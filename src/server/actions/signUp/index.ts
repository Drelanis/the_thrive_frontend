'use server';

import { SignUpDto } from '@configs';
import { signUpValidationSchema } from '@modules/stores';

export const signUp = async (values: SignUpDto) => {
  try {
    await signUpValidationSchema.validate(values);

    return { isError: false, message: 'Account created =)' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;

      return { isError: true, message: errorMessage };
    }
  }
};
