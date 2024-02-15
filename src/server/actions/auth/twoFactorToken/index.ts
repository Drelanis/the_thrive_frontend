import { TWO_FACTOR_TOKEN_EXPIRES } from '@configs';
import { db, sendTwoFactorTokenEmail } from '@lib';
import { SuccessResponse } from '@server/utils';
import crypto from 'crypto';
import { addMinutes } from 'date-fns';

import {
  getTwoFactorConfirmationByUserId,
  updateTwoFactorConfirmation,
} from './confirmation';

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    let twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    if (!twoFactorToken) {
      twoFactorToken = await generateTwoFactorToken(email);
    }

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  // eslint-disable-next-line no-magic-numbers
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = addMinutes(new Date(), TWO_FACTOR_TOKEN_EXPIRES);

  const twoFactorToken = await db.twoFactorToken.upsert({
    where: { email },
    update: { email, token, expires },
    create: { email, token, expires },
  });

  return twoFactorToken;
};

export const deleteTwoFactorToken = async (id: string) => {
  const twoFactorToken = await db.twoFactorToken.delete({
    where: { id },
  });

  return twoFactorToken;
};

export const sendTwoFactor = async (email: string) => {
  const twoFactorToken = await generateTwoFactorToken(email);

  await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

  return SuccessResponse({
    message: 'Confirm two-factor authentication!',
    extraData: { isTwoFactor: true },
  });
};

export const twoFactorDataVerification = async (
  userId: string,
  email: string,
) => {
  const tokenConfirmation = await getTwoFactorConfirmationByUserId(userId);

  if (!tokenConfirmation) {
    throw new Error('Something went wrong');
  }

  let expired = false;

  if (tokenConfirmation?.expires) {
    expired = new Date() > tokenConfirmation?.expires;
  }

  if (expired) {
    const response = await sendTwoFactor(email);

    return response;
  }
};

export const twoFactorCodeVerification = async (
  email: string,
  twoFactorCode: string,
) => {
  const twoFactorToken = await getTwoFactorTokenByEmail(email);

  const isCodeMatch = twoFactorToken!.token === twoFactorCode;

  if (!isCodeMatch) {
    throw new Error('Invalid code!');
  }

  await deleteTwoFactorToken(twoFactorToken!.id);

  await updateTwoFactorConfirmation(email);
};

export * from './confirmation';
