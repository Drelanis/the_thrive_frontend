import { Providers } from '@configs';
import { upsertSession } from '@server/actions/auth/session';
import { getTwoFactorConfirmationByUserId } from '@server/actions/auth/twoFactorToken';
import {
  getUserById,
  updateUserEmailVerifiedById,
  updateUserImageById,
} from '@server/actions/user';
import { userAgent } from 'next/server';

import { SignInParams } from '../types';

export const signInCallback = async (
  params: SignInParams,
  request?: Request,
) => {
  const { user, account, profile } = params;

  const { id } = user;

  if (!id) {
    return false;
  }

  let existingUser = await getUserById(id);

  if (account?.type !== Providers.CREDENTIALS && !existingUser) {
    return true;
  }

  if (account?.type === Providers.CREDENTIALS && existingUser) {
    await upsertSession(existingUser, user.agent);
  }

  if (account?.type !== Providers.CREDENTIALS) {
    if (!existingUser?.emailVerified) {
      existingUser = await updateUserEmailVerifiedById(id);
    }

    if (!existingUser?.image && profile?.picture) {
      existingUser = await updateUserImageById(id, profile?.picture as string);
    }

    if (!request || !existingUser) {
      return false;
    }

    const linkedUserAgent = userAgent(request);

    await upsertSession(existingUser, linkedUserAgent.ua);

    return true;
  }

  if (!existingUser?.emailVerified) {
    return false;
  }

  if (existingUser.isTwoFactorEnabled) {
    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id,
    );

    if (!twoFactorConfirmation) {
      return false;
    }
  }

  return true;
};
