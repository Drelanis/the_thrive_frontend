import { yupResolver } from '@hookform/resolvers/yup';
import { newPasswordStore, newPasswordValidationSchema } from '@modules/stores';
import { useForm } from 'react-hook-form';

export const useLogic = () => {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(newPasswordValidationSchema),
    defaultValues: newPasswordStore,
    mode: 'onChange',
  });

  const onSubmit = () => getValues();

  return {
    control,
    isValid,
    onSubmit,
  };
};
