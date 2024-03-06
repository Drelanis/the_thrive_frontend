import { ErrorHints, OfficeAddressDtoType } from '@configs';
import { db } from '@lib';

export const createOfficeAddress = async (
  address: OfficeAddressDtoType[],
  companyId: string,
) => {
  try {
    const updatedAddress = address.map((currentAddress) => {
      return { companyId, ...currentAddress };
    });

    const createdAddress = await db.officeAddress.createMany({
      data: updatedAddress,
    });

    return createdAddress;
  } catch (error) {
    throw new Error(ErrorHints.COMMON_ERROR);
  }
};
