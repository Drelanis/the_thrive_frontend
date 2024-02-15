'use client';

import { AuthFormContainer, AuthTitle } from '@common';
import { Routes } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Input } from '@ui';

import { useLogic } from './useLogic';

export const ResetPassword = () => {
  const { control, isValid, onSubmit } = useLogic();

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
          loading={false}
          disabled={!isValid || false}
          variant="contained"
          type="submit"
          fullWidth
        >
          SEND RESET EMAIL
        </LoadingButton>
      </AuthFormContainer>
    </>
  );
};
