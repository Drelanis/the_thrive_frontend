import { CompanyDirectionType, CompanyDtoType, ErrorHints } from '@configs';
import { db } from '@lib';
import { auth } from '@server/nextAuth';

import { getUserById } from '../user';

import { createOfficeAddress } from './address';
import { findManyDirections } from './direction';

export const createCompany = async (dto: CompanyDtoType) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return null;
    }

    const user = await getUserById(session?.user.id);

    if (!user) {
      throw new Error(ErrorHints.COMMON_ERROR);
    }

    const { name, email, numberOfEmployee, address, directions } = dto;

    const newCompany = await db.company.create({
      data: {
        name,
        email,
        numberOfEmployee: Number(numberOfEmployee),
        createById: user.id,
      },
    });

    await createOfficeAddress(address, newCompany.id);

    const companyDirections = await findManyDirections(directions);

    const updatedCompany = await addCompanyDirection(
      newCompany.id,
      companyDirections,
    );

    return updatedCompany;
  } catch (error) {
    throw new Error(ErrorHints.COMMON_ERROR);
  }
};

const addCompanyDirection = async (
  companyId: string,
  companyDirections: CompanyDirectionType[],
) => {
  try {
    const updatedCompany = await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        direction: {
          set: companyDirections,
        },
      },
    });

    return updatedCompany;
  } catch (error) {
    throw new Error(ErrorHints.COMMON_ERROR);
  }
};

export * from './direction';
