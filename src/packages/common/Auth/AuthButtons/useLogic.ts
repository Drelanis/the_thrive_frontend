import { Providers } from '@configs';
import { signIn } from 'next-auth/react';
import { useCallback, useTransition } from 'react';

export const useLogic = () => {
  const [isPending, startTransition] = useTransition();

  const signInWithGoogle = useCallback(() => {
    startTransition(async () => {
      await signIn(Providers.GOOGLE);
    });
  }, [startTransition]);

  const signInWithGitHub = useCallback(() => {
    startTransition(async () => {
      await signIn(Providers.GITHUB);
    });
  }, [startTransition]);

  return { signInWithGoogle, signInWithGitHub, isPending };
};
