import {
  getSessionByUserId,
  upsertSession,
} from '@server/actions/auth/session';
import { getUserById } from '@server/actions/user';
import { userAgent } from 'next/server';

import { JWTParams } from '../types';

export const jwtCallback = async (params: JWTParams, request?: Request) => {
  const { token, user } = params;

  const { sub } = token;

  let agent = '';

  if (user && user.agent) {
    agent = user.agent;
  }

  if (token.agent) {
    agent = token.agent;
  }

  if (request) {
    agent = userAgent(request).ua;
  }

  const existingUser = await getUserById(sub!);

  let session = await getSessionByUserId(sub!, agent);

  if (!session) {
    session = await upsertSession(existingUser!, agent);
  }

  return { sessionId: session.id, agent, sub: existingUser!.id };
};
