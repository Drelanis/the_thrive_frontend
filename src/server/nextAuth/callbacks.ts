import { Providers, UserRoles } from '@configs';
import { getTwoFactorConfirmationByUserId } from '@server/actions/auth/twoFactorToken';
import {
  getUserById,
  updateUserEmailVerifiedById,
  updateUserImageById,
} from '@server/actions/user';

import { CallbacksType } from './types';

export const callbacks: CallbacksType = {
  async signIn({ user, account, profile }) {
    const { id } = user;

    if (!id) {
      return false;
    }

    const existingUser = await getUserById(id);

    if (account?.type !== Providers.CREDENTIALS) {
      if (!existingUser?.emailVerified) {
        await updateUserEmailVerifiedById(id);
      }

      if (!existingUser?.image && profile?.picture) {
        await updateUserImageById(id, profile?.picture as string);
      }

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
  },
  session({ session, token }) {
    const { user } = session;

    if (token && user) {
      const { sub: id, role } = token;

      user.id = id;
      user.role = role as UserRoles;
      user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      user.emailVerified = token.emailVerified as Date;
    }

    return session;
  },
  async jwt({ token }) {
    const { sub } = token;

    const existingUser = await getUserById(sub || '');

    if (!existingUser) {
      return token;
    }

    token.emailVerified = existingUser.emailVerified;
    token.role = existingUser.role;
    token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

    return token;
  },
};
