'use client';

import { AuthButtons, AuthTitle } from '@common';
import { Routes } from '@configs';
import { Toast } from '@ui';

import { SignUpForm } from './components';
import { StyledDivider } from './styles';
import { useLogic } from './useLogic';

export const SignUp = () => {
  const { control, onSignUp, isValid, isPending } = useLogic();

  return (
    <>
      <AuthTitle
        header="Create account"
        link={Routes.SING_IN}
        linkText="Login"
        subHeader="Already have an account?"
      />
      <SignUpForm
        control={control}
        onSubmit={onSignUp}
        isValid={isValid}
        isPending={isPending}
      />
      <StyledDivider>OR</StyledDivider>
      <AuthButtons />
      <Toast />
    </>
  );
};
