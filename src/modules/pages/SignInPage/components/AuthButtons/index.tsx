import { GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

import { StyledContainer } from './styles';

export const AuthButtons = () => {
  return (
    <StyledContainer>
      <Button
        style={{ backgroundColor: 'black' }}
        variant="contained"
        endIcon={<GitHub />}
      />
      <Button variant="outlined" endIcon={<FcGoogle />} />
    </StyledContainer>
  );
};
