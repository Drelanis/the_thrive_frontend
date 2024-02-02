import { signIn } from 'next-auth/react';

export const useLogic = () => {
  const signInWithGoogle = async () => {
    await signIn('google');
  };

  const signInWithGitHub = async () => {
    await signIn('github');
  };

  return { signInWithGoogle, signInWithGitHub };
};
