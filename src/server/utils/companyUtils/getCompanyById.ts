import { db } from '@lib/db';
import { CompanyType } from '@server/types';

export const getCompanyById = async (id: string = '') => {
  try {
    const existingCompany = (await db.company.findUnique({
      where: {
        id,
      },
    })) as CompanyType | null;

    return existingCompany;
  } catch {
    return null;
  }
};
