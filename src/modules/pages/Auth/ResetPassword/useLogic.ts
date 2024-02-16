import { yupResolver } from '@hookform/resolvers/yup';
import {
  resetPasswordStore,
  resetPasswordValidationSchema,
} from '@modules/stores';
import { sendEmailForResetPassword } from '@server';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const [isPending, startTransition] = useTransition();

  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: resetPasswordStore,
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    startTransition(async () => {
      const data = await sendEmailForResetPassword(getValues());

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
