'use client';

import { AuthButtons, AuthContainer, AuthTitle } from '@common';
import { Divider } from '@mui/material';
import { Toast } from '@ui';

import { SignInForm } from './components';
import { useLogic } from './useLogic';

export const SignInPage = () => {
  const { onSubmit, control, isPending, isValid } = useLogic();

  return (
    <AuthContainer>
      <AuthTitle
        header="Welcome back"
        subHeader="Don't have an account?"
        link="./signup"
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
