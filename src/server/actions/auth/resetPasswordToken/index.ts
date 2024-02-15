import { RESET_TOKEN_EXPIRES } from '@configs';
import { db } from '@lib';
import { addMinutes } from 'date-fns';
import { v4 as uuid } from 'uuid';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const upsertResetPasswordToken = async (email: string) => {
  try {
    const token = uuid();

    const expires = addMinutes(new Date(), RESET_TOKEN_EXPIRES);

    const resetPasswordToken = await db.passwordResetToken.upsert({
      where: { email },
      update: { email, token, expires },
      create: { email, token, expires },
    });

    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};
