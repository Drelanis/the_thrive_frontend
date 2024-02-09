'use server';

import { TOKEN_EXPIRES } from '@configs/constants';
import { db, sendVerificationEmail } from '@lib';
import {
  getUserByEmail,
  updateUserByEmailVerified,
} from '@server/actions/user';
import { ErrorResponse } from '@server/utils';
import { addMinutes } from 'date-fns';
import { v4 as uuid } from 'uuid';

import {
  checkTokenExpiration,
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from './token';

const upsertVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = addMinutes(new Date(), TOKEN_EXPIRES);

  const verificationToken = await db.verificationToken.upsert({
    where: { email },
    update: { email, token, expires },
    create: { email, token, expires },
  });

  return verificationToken;
};

export const emailVerify = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      throw new Error('Something went wrong!');
    }

    checkTokenExpiration(existingToken.expires);

    await updateUserByEmailVerified(existingToken.email);

    await deleteVerificationTokenById(existingToken.id);

    return { isError: false, message: 'Email verified!' };
  } catch (error) {
    return ErrorResponse({ error });
  }
};

export const checkEmailVerification = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser?.emailVerified) {
    return;
  }

  const verificationToken = await upsertVerificationToken(email);

  await sendVerificationEmail(email, verificationToken?.token || '');

  throw new Error('Email not verified. Please confirm your email address.');
};
