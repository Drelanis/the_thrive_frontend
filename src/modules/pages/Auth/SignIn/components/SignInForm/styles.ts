import { Link } from '@mui/material';
import { styled as MUIStyled } from '@mui/system';
import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 100px;
`;

export const StyledLink = MUIStyled(Link)`
  margin-left: auto;
`;
