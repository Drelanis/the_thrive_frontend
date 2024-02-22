// ! TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { getCallbacks } from './callbacks';

export const {
  handlers: { GET, POST },
  auth,
  signIn: NASignIn,
  signOut: NASignOut,
} = NextAuth((request?: Request) => {
  const callbacks = getCallbacks(request);

  return {
    callbacks,
    ...authConfig,
  };
});
