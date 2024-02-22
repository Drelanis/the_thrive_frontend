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

import { CallbacksType } from './types';

export const callbacks: CallbacksType = {
  async signIn({ user, account, profile }) {
    const { id } = user;

    if (!id) {
      return false;
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return false;
    }

    if (account?.type !== Providers.CREDENTIALS) {
      if (!existingUser?.emailVerified) {
        await updateUserEmailVerifiedById(id);
      }

      if (!existingUser?.image && profile?.picture) {
        await updateUserImageById(id, profile?.picture as string);
      }

      await upsertSession(existingUser);

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
      const { sessionId } = token;

      if (!sessionId) {
        return session;
      }

      let userSession = await getSessionById(sessionId);

      if (!userSession) {
        return session;
      }

      if (new Date(userSession.expires) < new Date()) {
        const updatedSession = await updateSessionByUserId(userSession.userId);

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
    }

    return session;
  },
  async jwt(params) {
    const { token } = params;

    const { sub } = token;

    if (!sub) {
      return token;
    }

    const existingUser = await getUserById(sub);

    const session = await getSessionByUserId(sub);

    if (!existingUser || !session) {
      return token;
    }

    return { sessionId: session.id };
  },
};
