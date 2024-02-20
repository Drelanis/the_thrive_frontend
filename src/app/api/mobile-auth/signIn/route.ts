import { ErrorResponse, signIn } from '@server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const email = searchParams.get('email');
  const password = searchParams.get('password');

  if (!email || !password) {
    const errorResponse = ErrorResponse({
      message: 'Invalid password or email',
    });

    return Response.json(errorResponse);
  }

  const response = await signIn({ email, password });

  return Response.json({ ...response });
};
