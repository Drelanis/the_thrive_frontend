import { Providers, UserRoles, UserType } from '@configs';
import {
  getSessionById,
  getSessionByUserId,
  updateSessionByUserId,
  upsertSession,
} from '@server/actions/auth/session';
import { getTwoFactorConfirmationByUserId } from '@server/actions/auth/twoFactorToken';
import {
  getUserById,
  updateUserEmailVerifiedById,
  updateUserImageById,
} from '@server/actions/user';
import jwt from 'jsonwebtoken';
import { userAgent } from 'next/server';

import { CallbacksType } from './types';

export const getCallbacks = (request?: Request): CallbacksType => {
  return {
    async signIn({ user, account, profile }) {
      const { id } = user;

      if (!id) {
        return false;
      }

      const existingUser = await getUserById(id);

      if (!existingUser) {
        return false;
      }

      if (account?.type === Providers.CREDENTIALS) {
        await upsertSession(existingUser, user.agent);
      }

      if (account?.type !== Providers.CREDENTIALS) {
        if (!existingUser?.emailVerified) {
          await updateUserEmailVerifiedById(id);
        }

        if (!existingUser?.image && profile?.picture) {
          await updateUserImageById(id, profile?.picture as string);
        }

        if (request) {
          const linkedUserAgent = userAgent(request);

          await upsertSession(existingUser, linkedUserAgent.ua);
        }

        return true;
      }

      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) {
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      const { user } = session;

      if (token && user) {
        const { sessionId, agent } = token;

        if (!sessionId) {
          return session;
        }

        let userSession = await getSessionById(sessionId);

        if (!userSession) {
          return session;
        }

        if (new Date(userSession.expires) < new Date()) {
          const updatedSession = await updateSessionByUserId(
            userSession.userId,
            agent,
          );

          userSession = updatedSession!;
        }

        const payload = jwt.verify(
          userSession?.sessionToken,
          process.env.AUTH_SECRET!,
        ) as UserType;

        user.id = payload.id;
        user.role = payload.role as UserRoles;
        user.isTwoFactorEnabled = payload.isTwoFactorEnabled;
        user.emailVerified = payload.emailVerified;
        user.image = payload.image;
        user.name = payload.name;
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.agent = agent;
      }

      return session;
    },
    async jwt(params) {
      const { token, user } = params;

      const { sub } = token;

      let agent = '';

      if (user) {
        agent = user.agent;
      }

      if (token.agent) {
        agent = token.agent;
      }

      if (request) {
        agent = userAgent(request).ua;
      }

      if (!sub) {
        return token;
      }

      const existingUser = await getUserById(sub);

      const session = await getSessionByUserId(sub, agent);

      if (!existingUser || !session) {
        return token;
      }

      return { sessionId: session.id, agent, sub: existingUser.id };
    },
  };
};
