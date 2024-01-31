import { GitHub } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
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
        disabled={isPending}
        variant="contained"
        startIcon={<GitHub />}
      />
      <LoadingButton
        disabled={isPending}
        variant="outlined"
        startIcon={<FcGoogle />}
      />
    </StyledContainer>
  );
};
