import { SigninDto, UserType } from '@configs';
import { getUserByEmail, signIn } from '@server';

export const POST = async (request: Request) => {
  const dto = (await request.json()) as SigninDto;

  const response = await signIn(dto);

  if (response?.isError) {
    return Response.json({ ...response });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restData } = (await getUserByEmail(
    dto.email,
  )) as UserType;

  return Response.json({ ...restData });
};
