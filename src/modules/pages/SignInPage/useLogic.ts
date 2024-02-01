import { yupResolver } from '@hookform/resolvers/yup';
import { signInStore, signInValidationSchema } from '@modules/stores';
import { signIn } from '@server/actions';
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
    resolver: yupResolver(signInValidationSchema),
    defaultValues: signInStore,
    mode: 'onChange',
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTransition(async () => {
      const data = await signIn(getValues());

      if (data?.isError) {
        toast.error(data?.message);
      }

      toast.success(data?.message);
    });
  };

  return {
    control,
    isValid,
    onSubmit,
    isPending,
  };
};
