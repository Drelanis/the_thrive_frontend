'use client';

import { Divider } from '@mui/material';

import { AuthButtons, SignInForm, Title } from './components';
import { StyledBox } from './styles';

export const SignInPage = () => {
  return (
    <StyledBox>
      <Title />
      <SignInForm />
      <Divider>OR</Divider>
      <AuthButtons />
    </StyledBox>
  );
};
