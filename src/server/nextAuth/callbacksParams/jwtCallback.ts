import { getSessionById, upsertSession } from '@server/actions/auth/session';
import { getUserById } from '@server/actions/user';
import { userAgent } from 'next/server';

import { JWTParams } from '../types';

export const jwtCallback = async (params: JWTParams, request?: Request) => {
  const { token, user } = params;

  let sub = '';
  let agent = '';
  let session = null;

  if (token && token.sub) {
    sub = token.sub;
  }

  if (token && token.sessionId) {
    session = await getSessionById(token.sessionId);

    if (session) {
      sub = session?.userId;
    }
  }

  if (user && user.agent) {
    agent = user.agent;
  }

  if (token.agent) {
    agent = token.agent;
  }

  if (request) {
    agent = userAgent(request).ua;
  }

  const existingUser = await getUserById(sub);

  if (!session) {
    session = await upsertSession(existingUser!, agent);
  }

  return { sessionId: session.id, agent };
};
