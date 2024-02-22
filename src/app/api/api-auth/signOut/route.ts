'use server';

import {
  auth,
  deleteSessionByUserId,
  ErrorResponse,
  SuccessResponse,
} from '@server';
import { cookies } from 'next/headers';

export const GET = async () => {
  const sessionToken = cookies().get('authjs.session-token');

  const session = await auth();

  if (!sessionToken || !session?.user.id) {
    return Response.json(ErrorResponse({}));
  }

  await deleteSessionByUserId(session.user.id, session.user.agent);

  cookies().delete('authjs.session-token');

  return Response.json(SuccessResponse({}));
};
