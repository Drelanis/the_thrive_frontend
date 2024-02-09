import { db } from '@lib';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
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
