import { Providers } from '@configs';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

export const useLogic = () => {
  const [isPending, startTransition] = useTransition();

  const signInWithGoogle = () => {
    startTransition(async () => {
      await signIn(Providers.GOOGLE);
    });
  };

  const signInWithGitHub = () => {
    startTransition(async () => {
      await signIn(Providers.GITHUB);
    });
  };

  return { signInWithGoogle, signInWithGitHub, isPending };
};
