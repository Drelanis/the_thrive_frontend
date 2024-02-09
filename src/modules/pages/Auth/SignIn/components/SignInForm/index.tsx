import { AuthFormContainer } from '@common';
import { Routes, SigninDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, InputType } from '@ui';
import { Control } from 'react-hook-form';

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
      <Input required fullWidth control={control} name="email" label="Email" />
      <Input
        required
        fullWidth
        control={control}
        label="Password"
        name="password"
        type={InputType.PASSWORD}
      />
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