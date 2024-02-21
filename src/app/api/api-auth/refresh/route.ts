import { auth } from '@server';

export const GET = async () => {
  const session = await auth();

  return Response.json({ ...session });
};
