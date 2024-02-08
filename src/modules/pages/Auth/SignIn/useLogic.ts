// import { Routes } from '@configs/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInStore, signInValidationSchema } from '@modules/stores';
// import { signIn } from '@server/actions';
// import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

export const useLogic = () => {
  const [isPending /* setTransition */] = useTransition();
  // const router = useRouter();

  const {
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
    defaultValues: signInStore,
    mode: 'onChange',
  });

  const onSubmit = () => {
    // setTransition(async () => {
    //   const data = await signIn(getValues());
    //   if (data?.isError) {
    //     toast.error(data?.message);
    //     return;
    //   }
    //   router.push(Routes.SETTINGS);
    // });
  };

  return {
    control,
    isValid,
    onSubmit,
    isPending,
  };
};
