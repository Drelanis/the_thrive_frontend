'use client';

import { AuthBackground, AuthContainer, AuthTitle } from '@common';
import { CircularProgress } from '@mui/material';
import { emailVerify } from '@server';
import { Toast } from '@ui';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onVerify = useCallback(async () => {
    if (!token) {
      toast.error('Something went wrong!');

      return;
    }

    const data = await emailVerify(token);

    if (data.isError) {
      toast.error('Something went wrong!');

      return;
    }

    toast.success('Email is verified');
  }, [token]);

  useEffect(() => {
    void onVerify();
  }, [token, onVerify]);

  return (
    <>
      <AuthBackground>
        <AuthContainer>
          <AuthTitle header="Authorization" subHeader="Confirm email" />
          <CircularProgress />
        </AuthContainer>
      </AuthBackground>
      <Toast />
    </>
  );
};

export default EmailVerify;
