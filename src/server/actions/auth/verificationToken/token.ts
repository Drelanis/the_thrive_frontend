import { TOKEN_EXPIRES } from '@configs/constants';
import { db } from '@lib';
import { addMinutes } from 'date-fns';
import { v4 as uuid } from 'uuid';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const deleteVerificationTokenById = async (id: string) => {
  try {
    const verificationToken = await db.verificationToken.delete({
      where: { id },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const checkTokenExpiration = (date: Date) => {
  const hasExpired = new Date(date) < new Date();

  if (hasExpired) {
    throw new Error(
      'The waiting time has expired, please confirm the mail again',
    );
  }
};

export const upsertVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = addMinutes(new Date(), TOKEN_EXPIRES);

  const verificationToken = await db.verificationToken.upsert({
    where: { email },
    update: { email, token, expires },
    create: { email, token, expires },
  });

  return verificationToken;
};
