'use client';

import { AuthFormContainer, AuthTitle } from '@common';
import { Routes } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input, Toast } from '@ui';

import { useLogic } from './useLogic';

export const ResetPassword = () => {
  const { control, isValid, onSubmit, isPending } = useLogic();

  return (
    <>
      <AuthTitle
        header="Password reset"
        subHeader="Do you remember your password?"
        linkText="Sign in"
        link={Routes.SING_IN}
      />
      <AuthFormContainer>
        <Input
          required
          fullWidth
          control={control}
          name="email"
          label="Email"
        />
        <LoadingButton
          onClick={onSubmit}
          loading={isPending}
          disabled={!isValid || isPending}
          variant="contained"
          type="submit"
          fullWidth
        >
          SEND RESET EMAIL
        </LoadingButton>
      </AuthFormContainer>
      <Toast />
    </>
  );
};
