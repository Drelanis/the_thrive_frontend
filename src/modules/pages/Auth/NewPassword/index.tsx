'use client';

import { AuthTitle } from '@common';
import { Routes } from '@configs';
import { Toast } from '@ui';
import React from 'react';

import { ResetPasswordForm } from './components';
import { useLogic } from './useLogic';

export const NewPassword = () => {
  const { control, isValid, onSubmit, isPending } = useLogic();

  return (
    <>
      <AuthTitle
        header="Password reset"
        subHeader="Do you remember your password?"
        linkText="Sign in"
        link={Routes.SING_IN}
      />
      <ResetPasswordForm
        control={control}
        isValid={isValid}
        isPending={isPending}
        onSubmit={onSubmit}
      />
      <Toast />
    </>
  );
};
