/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { PrismaClient } from '@prisma/client';

// * We need this so that we don't create a new PrismaClient every time we reload
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
