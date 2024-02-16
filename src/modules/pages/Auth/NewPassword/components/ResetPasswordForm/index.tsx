import { AuthFormContainer } from '@common';
import { NewPasswordDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, InputType } from '@ui';
import React from 'react';
import { Control } from 'react-hook-form';

type Props = {
  control: Control<NewPasswordDto>;
  isPending: boolean;
  isValid: boolean;
  onSubmit: () => void;
};

export const ResetPasswordForm = (props: Props) => {
  const { control, isPending, isValid, onSubmit } = props;

  return (
    <AuthFormContainer>
      <Input
        required
        fullWidth
        control={control}
        label="New password"
        name="newPassword"
        type={InputType.PASSWORD}
      />
      <Input
        required
        fullWidth
        control={control}
        label="Repeat new password"
        name="repeatNewPassword"
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
        RESET PASSWORD
      </LoadingButton>
    </AuthFormContainer>
  );
};
