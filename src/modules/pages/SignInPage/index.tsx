'use client';

import { SignInForm, Title } from './components';
import { StyledBox } from './styles';

export const SignInPage = () => {
  return (
    <StyledBox>
      <Title />
      <SignInForm />
    </StyledBox>
  );
};
