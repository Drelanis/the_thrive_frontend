import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  Routes,
  SESSION_EXPIRATION,
  SESSION_UPDATE_AGE,
  SignUpDto,
} from '@configs';
import { db } from '@lib';
import { userAgent } from 'next/server';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { authorize as NAAuthorize } from './authorize';

export default {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    // * session token expiration time: 24 hours
    maxAge: SESSION_EXPIRATION,
    updateAge: SESSION_UPDATE_AGE,
  },
  pages: {
    signIn: Routes.SING_IN,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials, request: Request) {
        const agent = userAgent(request).ua;

        const user = await NAAuthorize(credentials as SignUpDto | null);

        if (!user) {
          return null;
        }

        return { agent, ...user };
      },
    }),
  ],
} satisfies NextAuthConfig;
