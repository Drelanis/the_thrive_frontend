import { Providers } from '@configs';
import { signIn } from 'next-auth/react';

export const useLogic = () => {
  const signInWithGoogle = async () => {
    await signIn(Providers.GOOGLE);
  };

  const signInWithGitHub = async () => {
    await signIn(Providers.GITHUB);
  };

  return { signInWithGoogle, signInWithGitHub };
};
