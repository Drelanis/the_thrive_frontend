import { AuthFormContainer } from '@common';
import { SignUpDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, InputType } from '@ui';
import { Control } from 'react-hook-form';

type Props = {
  control: Control<SignUpDto>;
  isPending: boolean;
  isValid: boolean;
  onSubmit: () => void;
};

export const SignUpForm = (props: Props) => {
  const { control, isPending, isValid, onSubmit } = props;

  return (
    <AuthFormContainer>
      <Input
        required
        fullWidth
        control={control}
        label="First name"
        name="firstName"
      />
      <Input
        required
        fullWidth
        control={control}
        label="Last name"
        name="lastName"
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
        onClick={onSubmit}
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
