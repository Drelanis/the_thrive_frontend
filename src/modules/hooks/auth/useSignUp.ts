import { SignUpDto } from '@configs';
import { signUp } from '@server/modules';
import { useCallback, useTransition } from 'react';
import { toast } from 'react-toastify';

type Params = {
  values: SignUpDto;
};

export const useSignUp = (params: Params) => {
  const { values } = params;

  const [isPending, setTransition] = useTransition();

  const onSignUp = useCallback(() => {
    setTransition(async () => {
      const data = await signUp(values);

      if (data.isError) {
        toast.error(data.message);

        return;
      }

      toast.success(data.message);
    });
  }, [values]);

  return { isPending, onSignUp };
};
