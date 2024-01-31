import { Box as MUIBox, styled } from '@mui/material';

export const StyledBox = styled(MUIBox)`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  padding: 50px;
  width: calc(50% - 100px);
  margin-left: auto;
`;
