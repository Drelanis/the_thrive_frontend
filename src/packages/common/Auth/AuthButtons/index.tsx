'use client';

import { LoadingButton } from '@mui/lab';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { StyledContainer } from './styles';

type Props = {
  isPending: boolean;
};

export const AuthButtons = (props: Props) => {
  const { isPending } = props;

  return (
    <StyledContainer>
      <LoadingButton
        onClick={() => signIn('google')}
        disabled={isPending}
        variant="outlined"
        startIcon={<FcGoogle />}
      />
    </StyledContainer>
  );
};
