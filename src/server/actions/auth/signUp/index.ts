'use server';

import { SignUpDto } from '@configs';
import { sendVerificationEmail } from '@lib';
import { db } from '@lib/db';
import { signUpValidationSchema } from '@modules/stores';
import { getUserByEmail } from '@server/actions/user';
import { getErrorResponse } from '@server/utils';
import * as bcrypt from 'bcryptjs';

import { generateVerificationToken } from '../verificationToken';

export const signUp = async (values: SignUpDto) => {
  try {
    const { name, email, password } =
      await signUpValidationSchema.validate(values);

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT) || 0,
    );

    const existingCompany = await getUserByEmail(email);

    if (existingCompany) {
      return {
        isError: true,
        message: 'A company with this email address has already been created',
      };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken?.token || '');

    return { isError: false, message: 'Confirmation email sent!' };
  } catch (error: unknown) {
    return getErrorResponse(error);
  }
};
