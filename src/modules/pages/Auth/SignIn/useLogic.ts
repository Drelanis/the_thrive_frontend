import { Routes } from '@configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInStore, signInValidationSchema } from '@modules/stores';
import { signIn } from '@server';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const [isPending, setTransition] = useTransition();
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  const router = useRouter();

  const {
    control,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
    defaultValues: signInStore,
    mode: 'onChange',
  });

  const onSubmit = () => {
    setTransition(async () => {
      const data = await signIn(getValues());

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
  };

  return {
    control,
    isValid,
    onSubmit,
    isPending,
    isTwoFactor,
    setValue,
  };
};
