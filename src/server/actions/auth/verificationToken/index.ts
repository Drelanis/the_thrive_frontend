import { TOKEN_EXPIRES } from '@configs/constants';
import { db } from '@lib/db';
import { VerificationToken } from '@prisma/client';
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

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
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

export const createVerificationToken = async (
  params: Omit<VerificationToken, 'id'>,
) => {
  try {
    const verificationToken = await db.verificationToken.create({
      data: { ...params },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = addMinutes(new Date(), TOKEN_EXPIRES);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  const verificationToken = await createVerificationToken({
    email,
    token,
    expires,
  });

  return verificationToken;
};
