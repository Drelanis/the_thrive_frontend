import { UserRoles } from '@configs';
import { getUserById } from '@server/actions/user';

import { CallbacksType } from './types';

export const callbacks: CallbacksType = {
  async signIn({ user, account }) {
    const { id } = user;

    if (account?.type !== 'credentials') {
      return true;
    }

    if (!id) {
      return false;
    }

    const existingUser = await getUserById(id);

    const isEmailVerified = Boolean(existingUser?.emailVerified);

    return isEmailVerified;
  },
  session({ session, token }) {
    const { user } = session;

    if (token && user) {
      const { sub: id, role } = token;

      user.id = id;
      user.role = role as UserRoles;
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

    return token;
  },
};
