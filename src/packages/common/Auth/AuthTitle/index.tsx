'use client';

import { Box, Typography } from '@mui/material';

import { StyledHeader, StyledLink, StyledSubHeaderContainer } from './styles';

type Props = {
  header: string;
  link: string;
  linkText: string;
  subHeader: string;
};

export const AuthTitle = (props: Props) => {
  const { header, link, linkText, subHeader } = props;

  return (
    <Box>
      <StyledHeader>{header}</StyledHeader>
      <StyledSubHeaderContainer>
        <Typography>{subHeader}</Typography>
        <StyledLink underline="hover" href={link}>
          {linkText}
        </StyledLink>
      </StyledSubHeaderContainer>
    </Box>
  );
};
