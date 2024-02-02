import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultJWT } from '@configs';
import { db } from '@lib/db';
import { EmployeeRoles } from '@server/types';
import { getUserById } from '@server/utils';
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
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },
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
