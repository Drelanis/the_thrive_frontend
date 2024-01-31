import { Box as MUIBox, styled } from '@mui/material';

export const StyledBox = styled(MUIBox)`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  padding: 100px;
  width: calc(50% - 200px);
  margin-left: auto;
`;
