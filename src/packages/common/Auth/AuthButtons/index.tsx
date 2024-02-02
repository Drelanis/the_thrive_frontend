'use client';

import { GitHub } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { FcGoogle } from 'react-icons/fc';

import { StyledContainer } from './styles';
import { useLogic } from './useLogic';

type Props = {
  isPending: boolean;
};

export const AuthButtons = (props: Props) => {
  const { isPending } = props;

  const { signInWithGitHub, signInWithGoogle } = useLogic();

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
