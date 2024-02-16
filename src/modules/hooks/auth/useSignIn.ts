import { Routes, SigninDto } from '@configs';
import { signIn } from '@server';
import { useRouter } from 'next/navigation';
import { SetStateAction, useCallback, useTransition } from 'react';
import { toast } from 'react-toastify';

type Params = {
  dto: SigninDto;
  setIsTwoFactor: (value: SetStateAction<boolean>) => void;
};

export const useSignIn = (params: Params) => {
  const { dto, setIsTwoFactor } = params;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSignIn = useCallback(() => {
    startTransition(async () => {
      const data = await signIn(dto);

      if (data && 'isTwoFactor' in data) {
        toast.info(data?.message);
        setIsTwoFactor(true);

        return;
      }

      if (data?.isError) {
        toast.error(data?.message);
      }

      router.push(Routes.DASHBOARD);
    });
  }, [dto, startTransition]);

  return { isPending, onSignIn };
};