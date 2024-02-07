import { PROVIDERS } from '@configs';
import { signIn } from 'next-auth/react';

export const useLogic = () => {
  const signInWithGoogle = async () => {
    await signIn(PROVIDERS.GOOGLE);
  };

  const signInWithGitHub = async () => {
    await signIn(PROVIDERS.GITHUB);
  };

  return { signInWithGoogle, signInWithGitHub };
};
