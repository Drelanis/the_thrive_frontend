import { yupResolver } from '@hookform/resolvers/yup';
import {
  resetPasswordStore,
  resetPasswordValidationSchema,
} from '@modules/stores';
import { useForm } from 'react-hook-form';

export const useLogic = () => {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: resetPasswordStore,
    mode: 'onChange',
  });

  const onSubmit = () => getValues();

  return {
    control,
    isValid,
    onSubmit,
  };
};
