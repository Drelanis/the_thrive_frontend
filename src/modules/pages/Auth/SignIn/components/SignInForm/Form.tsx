import { SigninDto } from '@configs';
import { Input, InputType } from '@ui';
import { Control } from 'react-hook-form';

type Props = {
  control: Control<SigninDto>;
  isTwoFactorForm: boolean;
};

export const Form = (props: Props) => {
  const { control, isTwoFactorForm } = props;

  if (isTwoFactorForm) {
    return (
      <Input
        required
        fullWidth
        control={control}
        name="email"
        label="Two-factor code"
      />
    );
  }

  return (
    <>
      <Input required fullWidth control={control} name="email" label="Email" />
      <Input
        required
        fullWidth
        control={control}
        label="Password"
        name="password"
        type={InputType.PASSWORD}
      />
    </>
  );
};
