import { Routes } from '@configs/constants';
import { db } from '@lib/db';
import { signInValidationSchema } from '@modules/stores';
import { getUserByEmail } from '@server/actions/user';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
  pages: {
    signIn: Routes.SIGN_IN,
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
        // TODO Solve the problem with wrong credentials

        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        await signInValidationSchema.validate({
          email,
          password,
        });

        const company = await getUserByEmail(email as string);

        if (!company || !company?.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          company.password,
        );

        if (passwordsMatch) {
          return company;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
