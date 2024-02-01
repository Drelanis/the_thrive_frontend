import { yupResolver } from '@hookform/resolvers/yup';
import { signUpStore, signUpValidationSchema } from '@modules/stores';
import { signUp } from '@server/actions';
import { FormEvent, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const [isPending, setTransition] = useTransition();

  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: signUpStore,
    mode: 'onChange',
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTransition(async () => {
      const data = await signUp(getValues());

      if (data?.isError) {
        toast.error(data?.message);

        return;
      }

      toast.success(data?.message);
    });
  };

  return {
    control,
    isValid,
    getValues,
    onSubmit,
    isPending,
  };
};
