import { auth, ErrorResponse } from '@server';

export const GET = async () => {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json(ErrorResponse({}));
  }

  return Response.json({ ...session });
};
