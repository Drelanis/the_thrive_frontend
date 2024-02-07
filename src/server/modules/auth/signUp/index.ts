'use server';

import { SignUpDto } from '@configs';
import { signUpValidationSchema } from '@modules/stores';
import { createUser } from '@server/modules/user';
import { ErrorResponse, SuccessResponse } from '@server/utils';

export const signUp = async (values: SignUpDto) => {
  try {
    const data = await signUpValidationSchema.validate(values);

    await createUser(data);

    return SuccessResponse({ message: 'Confirmation email sent!' });
  } catch (error: unknown) {
    return ErrorResponse({ error });
  }
};
