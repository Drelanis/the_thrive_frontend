import { SignUpDto } from '@configs';
import { signUp } from '@server/actions';
import { useCallback, useTransition } from 'react';
import { toast } from 'react-toastify';

type Params = {
  getValues: () => SignUpDto;
};

export const useSignUp = (params: Params) => {
  const { getValues } = params;

  const [isPending, startTransition] = useTransition();

  const onSignUp = useCallback(() => {
    startTransition(async () => {
      const data = await signUp(getValues());

      if (data?.isError) {
        toast.error(data.message);

        return;
      }

      toast.success(data?.message);
    });
  }, [startTransition]);

  return { isPending, onSignUp };
};
