import { CompanyDtoType, MessageHints } from '@configs';
import { createCompany, ErrorResponse } from '@server';

export const POST = async (request: Request) => {
  try {
    const dto = (await request.json()) as CompanyDtoType;

    const company = await createCompany(dto);

    return Response.json({
      message: MessageHints.THE_COMPANY_CREATED,
      ...company,
    });
  } catch (error) {
    return Response.json(ErrorResponse({ error }));
  }
};
