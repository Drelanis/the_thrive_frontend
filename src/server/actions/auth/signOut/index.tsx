'use server';

import { signOut as NASignOut } from '@root/src/auth';

export const signOut = async () => {
  await NASignOut();
};
