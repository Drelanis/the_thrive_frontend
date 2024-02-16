import { SignUpDto } from '@configs';
import { signUp } from '@server/actions';
import { useCallback, useTransition } from 'react';
import { toast } from 'react-toastify';

type Params = {
  values: SignUpDto;
};

export const useSignUp = (params: Params) => {
  const { values } = params;

  const [isPending, startTransition] = useTransition();

  const onSignUp = useCallback(() => {
    startTransition(async () => {
      const data = await signUp(values);

      if (data?.isError) {
        toast.error(data.message);

        return;
      }

      toast.success(data?.message);
    });
  }, [values, startTransition]);

  return { isPending, onSignUp };
};
