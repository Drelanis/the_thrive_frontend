'use client';

import { Divider } from '@mui/material';

import { AuthButtons, SignInForm, Title } from './components';
import { StyledBox } from './styles';
import { useLogic } from './useLogic';

export const SignInPage = () => {
  const { onSubmit, control, isPending, isValid } = useLogic();

  return (
    <StyledBox>
      <Title />
      <SignInForm
        control={control}
        onSubmit={onSubmit}
        isValid={isValid}
        isPending={isPending}
      />
      <Divider>OR</Divider>
      <AuthButtons isPending={isPending} />
    </StyledBox>
  );
};
