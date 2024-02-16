import { PrismaAdapter } from '@auth/prisma-adapter';
import { Routes, SignUpDto } from '@configs';
import { db } from '@lib';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { authorize as NAAuthorize } from './authorize';

export default {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: Routes.SING_IN,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const response = await NAAuthorize(credentials as SignUpDto | null);

        return response;
      },
    }),
  ],
} satisfies NextAuthConfig;
