import { SigninDto } from '@configs';
import { Input, InputType } from '@ui';
import { useEffect } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

type Props = {
  control: Control<SigninDto>;
  isTwoFactorForm: boolean;
  setValue: UseFormSetValue<SigninDto>;
};

export const Form = (props: Props) => {
  const { control, isTwoFactorForm, setValue } = props;

  useEffect(() => {
    setValue('twoFactorCode', '', { shouldValidate: true });
  }, [isTwoFactorForm]);

  if (isTwoFactorForm) {
    return (
      <Input
        required
        fullWidth
        control={control}
        name="twoFactorCode"
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
