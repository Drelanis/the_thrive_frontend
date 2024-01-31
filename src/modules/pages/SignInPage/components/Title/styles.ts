import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledHeader = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`;

export const StyledSubHeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  margin-left: 5px;
`;
