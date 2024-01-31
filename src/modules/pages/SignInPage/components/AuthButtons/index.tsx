import { GitHub, Google } from '@mui/icons-material';
import { Button } from '@mui/material';

import { StyledContainer } from './styles';

export const AuthButtons = () => {
  return (
    <StyledContainer>
      <Button
        style={{ backgroundColor: 'black' }}
        variant="contained"
        endIcon={<GitHub />}
      >
        With GitHub
      </Button>
      <Button variant="outlined" endIcon={<Google />}>
        With Google
      </Button>
    </StyledContainer>
  );
};
