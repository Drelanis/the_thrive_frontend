import { NASignOut } from '@server/nextAuth/auth';
import { ErrorResponse } from '@server/utils';

import { deleteSessionByUserId } from '../session';

export const signOut = async (userId: string, agent: string) => {
  try {
    await deleteSessionByUserId(userId, agent);

    await NASignOut();
  } catch (error) {
    return ErrorResponse({ error });
  }
};
