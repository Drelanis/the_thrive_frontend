import { AuthFormContainer } from '@common';
import { Routes, SigninDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Control } from 'react-hook-form';

import { Form } from './Form';
import { StyledLink } from './styles';

type Props = {
  control: Control<SigninDto>;
  isPending: boolean;
  isValid: boolean;
  onSubmit: () => void;
};

export const SignInForm = (props: Props) => {
  const { control, isValid, onSubmit, isPending } = props;

  return (
    <AuthFormContainer>
      <Form control={control} isTwoFactorForm={false} />
      <LoadingButton
        onClick={onSubmit}
        loading={isPending}
        disabled={!isValid || isPending}
        variant="contained"
        type="submit"
        fullWidth
      >
        SIGN IN
      </LoadingButton>
      <StyledLink underline="none" href={Routes.SING_UP}>
        Forgot Password?
      </StyledLink>
    </AuthFormContainer>
  );
};
