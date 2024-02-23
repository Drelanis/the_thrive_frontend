import { SignUpDto } from '@configs';
import { signUp } from '@server';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const dto = (await request.json()) as SignUpDto;

  const response = await signUp(dto);

  return Response.json({ ...response });
};
