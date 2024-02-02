import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultJWT } from '@configs';
import { db } from '@lib/db';
import { EmployeeRoles } from '@server/types';
import { getCompanyById } from '@server/utils';
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
    // async signIn({ user }) {
    //   const existingUser = await getCompanyById(user.id);

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

      const existingUser = await getCompanyById(sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  ...authConfig,
});
