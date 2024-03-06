'use server';

import { ErrorHints } from '@configs';
import { db } from '@lib';

export const findAllDirections = async () => {
  try {
    const directions = await db.direction.findMany();

    return directions;
  } catch (error) {
    throw new Error(ErrorHints.COMMON_ERROR);
  }
};

export const findManyDirections = async (directionsId: string[]) => {
  try {
    const companyDirections = await db.direction.findMany({
      where: {
        id: {
          in: directionsId,
        },
      },
    });

    return companyDirections;
  } catch (error) {
    throw new Error(ErrorHints.COMMON_ERROR);
  }
};
