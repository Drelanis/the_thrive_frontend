import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultJWT } from '@configs';
import { db } from '@lib/db';
import { getUserById } from '@server/actions/user';
import { EmployeeRoles } from '@server/types';
import NextAuth, { Session } from 'next-auth';

import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id);

      const isEmailVerified = Boolean(existingUser?.emailVerified);

      return isEmailVerified;
    },
    session({ session, token }: { session: Session; token?: DefaultJWT }) {
      const { user } = session;

      if (token) {
        const { sub: id, role } = token;

        user.id = id;
        user.role = role as EmployeeRoles;
      }

      return session;
    },
    async jwt({ token }) {
      const { sub } = token;

      const existingUser = await getUserById(sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  ...authConfig,
});
