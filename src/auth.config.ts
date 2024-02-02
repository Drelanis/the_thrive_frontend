import { signInValidationSchema } from '@modules/stores';
import { getCompanyByEmail } from '@server/utils';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
  providers: [
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

        const company = await getCompanyByEmail(email as string);

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
