import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@lib';
import NextAuth from 'next-auth';

import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn: NASignIn,
  signOut: NASignOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
