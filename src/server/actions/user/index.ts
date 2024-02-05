import { db } from '@lib/db';
import { UserType } from '@server/types';

export const getUserById = async (id: string = '') => {
  try {
    const existingUser = (await db.user.findUnique({
      where: {
        id,
      },
    })) as UserType | null;

    return existingUser;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = (await db.user.findUnique({
      where: {
        email,
      },
    })) as UserType | null;

    return existingUser;
  } catch {
    return null;
  }
};
