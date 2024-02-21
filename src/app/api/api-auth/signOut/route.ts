import { ErrorResponse, SuccessResponse } from '@server';
import { cookies } from 'next/headers';

export const GET = () => {
  const sessionToken = cookies().get('authjs.session-token');

  if (!sessionToken) {
    return Response.json(ErrorResponse({}));
  }

  cookies().delete('authjs.session-token');

  return Response.json(SuccessResponse({}));
};
