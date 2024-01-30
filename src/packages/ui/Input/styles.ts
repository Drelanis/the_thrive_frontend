import { styled, TextField } from '@mui/material';

type Props = {
  error: boolean;
};

export const StyledTextField = styled(TextField)(({ error }: Props) => ({
  marginBottom: error ? '0px' : '23px',
}));
