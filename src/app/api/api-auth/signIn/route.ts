import { UserType } from '@configs';
import { ErrorResponse, getUserByEmail, signIn } from '@server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const email = searchParams.get('email');
  const userPassword = searchParams.get('password');

  if (!email || !userPassword) {
    const errorResponse = ErrorResponse({
      message: 'Invalid password or email',
    });

    return Response.json(errorResponse);
  }

  const response = await signIn({ email, password: userPassword });

  if (response?.isError) {
    return Response.json({ ...response });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restData } = (await getUserByEmail(email)) as UserType;

  return Response.json({ ...restData });
};
