'use client';

import { AuthButtons, AuthContainer, AuthTitle } from '@common';
import { Divider } from '@mui/material';

import { SignUpForm } from './components';
import { useLogic } from './useLogic';

export const SignUpPage = () => {
  const { control, onSubmit, isValid } = useLogic();

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
        isPending={false}
      />
      <Divider>OR</Divider>
      <AuthButtons isPending={false} />
    </AuthContainer>
  );
};
