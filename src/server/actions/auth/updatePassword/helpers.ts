import { getUserByEmail } from '@server/actions/user';

import { getPasswordResetTokenByToken } from '../resetPasswordToken';

export const checkTokenExpires = async (token: string) => {
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    throw new Error('Something went wrong!');
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    throw new Error('Time has expired!');
  }

  return existingToken;
};

export const checkEmailForExistence = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Email does not exist!');
  }

  return user;
};
