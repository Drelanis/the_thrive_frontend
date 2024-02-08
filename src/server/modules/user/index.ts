import { SignUpDto, UserType } from '@configs';
import { db } from '@lib';
import * as bcrypt from 'bcryptjs';

export const getUserById = async (id: string): Promise<UserType | null> => {
  const existingUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  return existingUser;
};

export const getUserByEmail = async (
  email: string,
): Promise<UserType | null> => {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  return existingUser;
};

export const createUser = async (dto: Omit<SignUpDto, 'repeatPassword'>) => {
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
};
