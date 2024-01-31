import { SigninDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, InputType } from '@ui';
import { FormEvent } from 'react';
import { Control } from 'react-hook-form';

import { FormContainer, StyledLink } from './styles';

type Props = {
  control: Control<SigninDto>;
  isPending: boolean;
  isValid: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const SignInForm = (props: Props) => {
  const { control, isValid, onSubmit, isPending } = props;

  return (
    <FormContainer onSubmit={onSubmit}>
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
        loading={isPending}
        disabled={!isValid || isPending}
        variant="contained"
        type="submit"
        fullWidth
      >
        SIGN IN
      </LoadingButton>
      <StyledLink underline="none" href="/signup">
        Forgot Password?
      </StyledLink>
    </FormContainer>
  );
};
