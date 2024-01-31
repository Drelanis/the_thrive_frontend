import { yupResolver } from '@hookform/resolvers/yup';
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return {
    control,
    isValid,
    getValues,
    onSubmit,
  };
};
