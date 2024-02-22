'use server';

import {
  SESSION_EXPIRATION_HOURS,
  SESSION_UPDATE_AGE,
  UserType,
} from '@configs';
import { db } from '@lib';
import { getUserById } from '@server/actions/user';
import { addSeconds } from 'date-fns';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

export const generateSessionToken = (user: UserType) => {
  const {
    id,
    name,
    email,
    firstName,
    lastName,
    image,
    emailVerified,
    role,
    isTwoFactorEnabled,
  } = user;

  const jti = uuid();

  const sessionToken = jwt.sign(
    {
      id,
      name,
      email,
      firstName,
      lastName,
      image,
      emailVerified,
      role,
      isTwoFactorEnabled,
      jti,
    },
    process.env.AUTH_SECRET!,
    { expiresIn: SESSION_EXPIRATION_HOURS },
  );

  return sessionToken;
};

export const upsertSession = async (user: UserType) => {
  try {
    const { id } = user;

    const sessionId = uuid();

    const token = generateSessionToken(user);

    const expires = addSeconds(new Date(), SESSION_UPDATE_AGE);

    const session = await db.session.upsert({
      where: { userId: id },
      update: { id: sessionId, expires, sessionToken: token },
      create: { id: sessionId, expires, sessionToken: token, userId: id },
    });

    return session;
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};

export const updateSessionByUserId = async (userId: string) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return null;
    }

    const session = await upsertSession(user);

    return session;
  } catch (error) {
    return null;
  }
};

export const getSessionByUserId = async (userId: string) => {
  try {
    const session = await db.session.findUnique({
      where: {
        userId,
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const getSessionById = async (id: string) => {
  try {
    const session = await db.session.findUnique({
      where: {
        id,
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const deleteSessionByUserId = async (userId: string) => {
  try {
    const session = await db.session.delete({
      where: {
        userId,
      },
    });

    return session;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
