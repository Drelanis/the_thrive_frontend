import { yupResolver } from '@hookform/resolvers/yup';
import { useSignIn } from '@modules/hooks/auth/useSignIn';
import { signInStore, signInValidationSchema } from '@modules/stores';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useLogic = () => {
  const [isTwoFactor, setIsTwoFactor] = useState(false);

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

  const { isPending, onSignIn } = useSignIn({
    dto: getValues(),
    setIsTwoFactor,
  });

  return {
    control,
    isValid,
    onSubmit: onSignIn,
    isPending,
    isTwoFactor,
    setValue,
  };
};
