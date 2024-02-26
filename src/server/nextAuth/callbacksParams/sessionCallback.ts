import { UserRoles, UserType } from '@configs';
import {
  getSessionById,
  updateSessionByUserId,
} from '@server/actions/auth/session';
import jwt from 'jsonwebtoken';

import { SessionParams } from '../types';

export const sessionCallback = async (params: SessionParams) => {
  const { session, token } = params;

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
};
