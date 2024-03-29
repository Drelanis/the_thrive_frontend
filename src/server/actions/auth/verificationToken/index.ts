'use server';

import {
  EMAIL_VERIFICATION_TOKEN_EXPIRES,
  ErrorHints,
  MessageHints,
} from '@configs/constants';
import { db, sendVerificationEmail } from '@lib';
import {
  getUserByEmail,
  updateUserByEmailVerified,
} from '@server/actions/user';
import { ErrorResponse, SuccessResponse } from '@server/utils';
import { addMinutes } from 'date-fns';
import { v4 as uuid } from 'uuid';

import {
  checkTokenExpiration,
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from './token';

export const upsertVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = addMinutes(new Date(), EMAIL_VERIFICATION_TOKEN_EXPIRES);

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
      throw new Error(ErrorHints.COMMON_ERROR);
    }

    checkTokenExpiration(existingToken.expires);

    await updateUserByEmailVerified(existingToken.email);

    await deleteVerificationTokenById(existingToken.id);

    return SuccessResponse({ message: MessageHints.EMAIL_VERIFIED });
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

  throw new Error(MessageHints.EMAIL_NOT_VERIFIED);
};

export const repeatMailVerification = async (token: string) => {
  try {
    const verificationToken = await getVerificationTokenByToken(token);

    if (!verificationToken) {
      return SuccessResponse({
        extraData: { isRedirect: true },
        message: MessageHints.REPEAT_MAIL_VERIFICATION,
      });
    }

    const { email } = verificationToken;

    const existingUser = await getUserByEmail(email);

    if (existingUser?.emailVerified) {
      return SuccessResponse({});
    }

    const updatedToken = await upsertVerificationToken(email);

    await sendVerificationEmail(email, updatedToken?.token);

    return SuccessResponse({ message: MessageHints.EMAIL_SENT });
  } catch (error) {
    return ErrorResponse({ error });
  }
};
