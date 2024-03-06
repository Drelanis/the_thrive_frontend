import { CompanyDtoType } from '@configs';
import { createCompany, ErrorResponse } from '@server';

export const POST = async (request: Request) => {
  try {
    const dto = (await request.json()) as CompanyDtoType;

    const company = await createCompany(dto);

    return Response.json(company);
  } catch (error) {
    return Response.json(ErrorResponse({ error }));
  }
};
