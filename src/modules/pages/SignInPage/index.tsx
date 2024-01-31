'use client';

import { AuthContainer } from '@common';
import { Divider } from '@mui/material';

import { AuthButtons, SignInForm, Title } from './components';
import { useLogic } from './useLogic';

export const SignInPage = () => {
  const { onSubmit, control, isPending, isValid } = useLogic();

  return (
    <AuthContainer>
      <Title />
      <SignInForm
        control={control}
        onSubmit={onSubmit}
        isValid={isValid}
        isPending={isPending}
      />
      <Divider>OR</Divider>
      <AuthButtons isPending={isPending} />
    </AuthContainer>
  );
};
