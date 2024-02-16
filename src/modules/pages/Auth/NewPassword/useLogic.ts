import { yupResolver } from '@hookform/resolvers/yup';
import { newPasswordStore, newPasswordValidationSchema } from '@modules/stores';
import { updatePassword } from '@server';
import { useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(newPasswordValidationSchema),
    defaultValues: newPasswordStore,
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    startTransition(async () => {
      const token = searchParams.get('token');

      const data = await updatePassword(getValues(), token);

      if (data?.isError) {
        toast.error(data.message);

        return;
      }

      toast.success(data?.message);
    });
  }, [startTransition]);

  return {
    control,
    isValid,
    onSubmit,
    isPending,
  };
};
