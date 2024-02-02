'use server';

import { signOut as NASignOut } from '@/src/auth';

export const signOut = async () => {
  await NASignOut();
};
