import { SigninDto } from '@configs';
import { sendEmailForResetPassword } from '@server';

export const POST = async (request: Request) => {
  const dto = (await request.json()) as Pick<SigninDto, 'email'>;

  const response = await sendEmailForResetPassword(dto);

  return Response.json({ ...response });
};
