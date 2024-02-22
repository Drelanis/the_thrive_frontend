import { NASignOut } from '@server/nextAuth/auth';
import { ErrorResponse } from '@server/utils';

import { deleteSessionByUserId } from '../session';

export const signOut = async (userId: string) => {
  try {
    await deleteSessionByUserId(userId);

    await NASignOut();
  } catch (error) {
    return ErrorResponse({ error });
  }
};
