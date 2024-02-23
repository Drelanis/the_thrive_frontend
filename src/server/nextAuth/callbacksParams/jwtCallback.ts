import { getSessionByUserId } from '@server/actions/auth/session';
import { getUserById } from '@server/actions/user';
import { userAgent } from 'next/server';

import { JWTParams } from '../types';

export const jwtCallback = async (params: JWTParams, request?: Request) => {
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
};
