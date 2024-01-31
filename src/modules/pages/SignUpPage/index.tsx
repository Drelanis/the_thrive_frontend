'use client';

import { AuthButtons, AuthContainer, AuthTitle } from '@common';
import { Divider } from '@mui/material';

export const SignUpPage = () => {
  return (
    <AuthContainer>
      <AuthTitle
        header="Create account"
        link="./signin"
        linkText="Login"
        subHeader="Already have an account?"
      />
      <Divider>OR</Divider>
      <AuthButtons isPending={false} />
    </AuthContainer>
  );
};
