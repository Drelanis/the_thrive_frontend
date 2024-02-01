'use client';

import { AuthButtons, AuthContainer, AuthTitle } from '@common';
import { Divider } from '@mui/material';
import { Toast } from '@ui';

import { SignUpForm } from './components';
import { useLogic } from './useLogic';

export const SignUpPage = () => {
  const { control, onSubmit, isValid, isPending } = useLogic();

  return (
    <AuthContainer>
      <AuthTitle
        header="Create account"
        link="./signin"
        linkText="Login"
        subHeader="Already have an account?"
      />
      <SignUpForm
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
