import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { callbacks } from './callbacks';

export const {
  handlers: { GET, POST },
  auth,
  signIn: NASignIn,
  signOut: NASignOut,
} = NextAuth({
  callbacks,
  ...authConfig,
});
