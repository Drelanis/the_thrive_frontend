import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GppBadIcon from '@mui/icons-material/GppBad';
import { CircularProgress, styled } from '@mui/material';

export const SpinnerStyled = styled(CircularProgress)`
  margin: auto;
`;

export const SuccessIcon = styled(CheckCircleIcon)`
  color: green;
  margin: auto;
  width: 300px;
  height: 300px;
`;

export const ErrorIcon = styled(GppBadIcon)`
  color: darkred;
  margin: auto;
  width: 300px;
  height: 300px;
`;
