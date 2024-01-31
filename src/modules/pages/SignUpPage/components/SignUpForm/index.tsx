import { AuthFormContainer } from '@common';
import { SignUpDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, InputType } from '@ui';
import { FormEvent } from 'react';
import { Control } from 'react-hook-form';

type Props = {
  control: Control<SignUpDto>;
  isPending: boolean;
  isValid: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const SignUpForm = (props: Props) => {
  const { control, isPending, isValid, onSubmit } = props;

  return (
    <AuthFormContainer onSubmit={onSubmit}>
      <Input
        required
        fullWidth
        control={control}
        label="Company name"
        name="name"
      />
      <Input required fullWidth control={control} label="Email" name="email" />
      <Input
        required
        fullWidth
        control={control}
        label="Password"
        name="password"
        type={InputType.PASSWORD}
      />
      <Input
        required
        fullWidth
        control={control}
        label="Repeat password"
        name="repeatPassword"
        type={InputType.PASSWORD}
      />
      <LoadingButton
        loading={isPending}
        disabled={!isValid || isPending}
        variant="contained"
        type="submit"
        fullWidth
      >
        SIGN UP
      </LoadingButton>
    </AuthFormContainer>
  );
};
