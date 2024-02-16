'use client';

import { GitHub } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { FcGoogle } from 'react-icons/fc';

import { StyledContainer } from './styles';
import { useLogic } from './useLogic';

export const AuthButtons = () => {
  const { signInWithGitHub, signInWithGoogle, isPending } = useLogic();

  return (
    <StyledContainer>
      <LoadingButton
        onClick={signInWithGoogle}
        disabled={isPending}
        variant="outlined"
        startIcon={<FcGoogle />}
      />
      <LoadingButton
        onClick={signInWithGitHub}
        disabled={isPending}
        variant="outlined"
        startIcon={<GitHub />}
      />
    </StyledContainer>
  );
};
