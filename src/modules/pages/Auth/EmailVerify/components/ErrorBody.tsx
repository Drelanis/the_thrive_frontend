import { Button } from '@mui/material';

import { ErrorIcon } from '../styles';

type Props = {
  isPending: boolean;
  onClick: () => void;
};

export const ErrorBody = (props: Props) => {
  const { isPending, onClick } = props;

  return (
    <>
      <ErrorIcon />
      <Button disabled={isPending} variant="contained" onClick={onClick}>
        Send again
      </Button>
    </>
  );
};
