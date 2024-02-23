import {
  jwtCallback,
  sessionCallback,
  signInCallback,
} from './callbacksParams';
import { CallbacksType } from './types';

export const getCallbacks = (request?: Request): CallbacksType => {
  return {
    async signIn(params) {
      const isSignIn = await signInCallback(params, request);

      return isSignIn;
    },
    async session(params) {
      const session = await sessionCallback(params);

      return session;
    },
    async jwt(params) {
      const token = jwtCallback(params, request);

      return token;
    },
  };
};
export { signInCallback };
