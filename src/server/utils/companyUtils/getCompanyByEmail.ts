import { db } from '@lib/db';
import { CompanyType } from '@server/types';

export const getCompanyByEmail = async (email: string) => {
  try {
    const existingCompany = (await db.company.findUnique({
      where: {
        email,
      },
    })) as CompanyType | null;

    return existingCompany;
  } catch {
    return null;
  }
};
