import { Providers, UserRoles } from '@configs';
import { getTwoFactorConfirmationByUserId } from '@server/actions/auth/twoFactorToken';
import { getUserById } from '@server/actions/user';

import { CallbacksType } from './types';

export const callbacks: CallbacksType = {
  async signIn({ user, account }) {
    const { id } = user;

    if (account?.type !== Providers.CREDENTIALS) {
      return true;
    }

    if (!id) {
      return false;
    }

    const existingUser = await getUserById(id);

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
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    }

    return session;
  },
  async jwt({ token }) {
    const { sub } = token;

    const existingUser = await getUserById(sub || '');

    if (!existingUser) {
      return token;
    }

    token.role = existingUser.role;
    token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

    return token;
  },
};
