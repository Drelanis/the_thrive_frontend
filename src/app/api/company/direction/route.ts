import { ErrorResponse, findAllDirections } from '@server';

export const GET = async () => {
  try {
    const directions = await findAllDirections();

    return Response.json(directions);
  } catch (error) {
    return Response.json(ErrorResponse({ error }));
  }
};
