import { Box, Typography } from '@mui/material';

import { StyledHeader, StyledLink, StyledSubHeaderContainer } from './styles';

export const Title = () => {
  return (
    <Box>
      <StyledHeader>Welcome back</StyledHeader>
      <StyledSubHeaderContainer>
        <Typography>Don't have an account?</Typography>
        <StyledLink underline="hover" href="/signup">
          Sign up
        </StyledLink>
      </StyledSubHeaderContainer>
    </Box>
  );
};
