import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '@modules/hooks';
import { signUpStore, signUpValidationSchema } from '@modules/stores';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

export const useLogic = () => {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: signUpStore,
    mode: 'onChange',
  });

  const { isPending, onSignUp } = useSignUp({ values: getValues() });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSignUp();
  };

  return {
    control,
    isValid,
    getValues,
    onSubmit,
    isPending,
  };
};
