import { db } from '@lib';
import { getUserByEmail } from '@server/actions/user';
import { addDays, subSeconds } from 'date-fns';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    let twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    if (!twoFactorConfirmation) {
      twoFactorConfirmation = await createTwoFactorConfirmation(userId);
    }

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const deleteTwoFactorConfirmationByUserId = async (id: string) => {
  try {
    await db.twoFactorConfirmation.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const updateTwoFactorConfirmation = async (email: string) => {
  const expires = addDays(new Date(), 1);

  const user = await getUserByEmail(email);

  await db.twoFactorConfirmation.update({
    where: { userId: user!.id },
    data: { expires },
  });
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    const expires = subSeconds(new Date(), 1);

    const twoFactorConfirmation = await db.twoFactorConfirmation.create({
      data: {
        userId,
        expires,
      },
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};
