// import { Routes } from '@configs/constants';
// import { db } from '@lib';
import { SignUpDto } from '@configs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { authorize as NAAuthorize } from './authorize';

export default {
  pages: {},
  events: {},
  providers: [
    Google({}),
    GitHub({}),
    Credentials({
      async authorize(credentials) {
        return NAAuthorize(credentials as SignUpDto | null);
      },
    }),
  ],
} satisfies NextAuthConfig;
