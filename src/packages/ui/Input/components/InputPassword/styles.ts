import { FormHelperText, OutlinedInput, styled } from '@mui/material';

type Props = {
  error: boolean;
};

export const StyledOutlinedInput = styled(OutlinedInput)(
  ({ error }: Props) => ({
    marginBottom: error ? '0px' : '23px',
  }),
);

export const StyledInputHelper = styled(FormHelperText)`
  color: rgb(211, 47, 47);
`;
