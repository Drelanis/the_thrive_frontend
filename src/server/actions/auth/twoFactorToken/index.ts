import { TWO_FACTOR_TOKEN_EXPIRES } from '@configs';
import { db } from '@lib';
import crypto from 'crypto';
import { addMinutes } from 'date-fns';

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

export * from './confirmation';
