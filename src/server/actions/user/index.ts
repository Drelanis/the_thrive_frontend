import { SignUpDto, UserType } from '@configs';
import { db } from '@lib';
import * as bcrypt from 'bcryptjs';

export const getUserById = async (id: string): Promise<UserType | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<UserType | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};

export const createUser = async (dto: Omit<SignUpDto, 'repeatPassword'>) => {
  try {
    const { firstName, lastName, email, password } = dto;

    const name = `${firstName} ${lastName}`;

    const existingCompany = await getUserByEmail(email);

    if (existingCompany) {
      throw new Error(
        'A company with this email address has already been created',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT) || 0,
    );

    const user = await db.user.create({
      data: {
        name,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const updateUserByEmailVerified = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new Error('Email does not exist!');
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email,
    },
  });
};
