'use client';

import { AuthButtons, AuthContainer, AuthTitle } from '@common';
import { Routes } from '@configs';
import { Divider } from '@mui/material';
import { Toast } from '@ui';

import { SignInForm } from './components';
import { useLogic } from './useLogic';

export const SignIn = () => {
  const { onSubmit, control, isPending, isValid } = useLogic();

  return (
    <AuthContainer>
      <AuthTitle
        header="Welcome back"
        subHeader="Don't have an account?"
        link={Routes.SING_UP}
        linkText="Sign up"
      />
      <SignInForm
        control={control}
        onSubmit={onSubmit}
        isValid={isValid}
        isPending={isPending}
      />
      <Divider>OR</Divider>
      <AuthButtons isPending={isPending} />
      <Toast />
    </AuthContainer>
  );
};
