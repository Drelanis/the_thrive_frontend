import { Routes } from '@configs';
import { emailVerify, repeatMailVerification } from '@server';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const [isPending, setIsPending] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [isError, setError] = useState(false);

  const onVerify = useCallback(async () => {
    if (!token) {
      setError(true);
      setIsPending(false);
      toast.error('Something went wrong!');

      return;
    }

    const data = await emailVerify(token);

    if (data?.isError) {
      setError(true);
      setIsPending(false);
      toast.error(data.message);

      return;
    }

    setIsPending(false);
    setVerified(true);

    toast.success(data?.message);
  }, [token]);

  const sendVerificationEmail = useCallback(async () => {
    const response = await repeatMailVerification(token || '');

    if (response?.isError) {
      setError(true);
      setIsPending(false);

      toast.error(response.message);

      return;
    }

    if (response && 'isRedirect' in response) {
      router.push(Routes.SING_IN);
      toast.error(response.message);

      return;
    }

    setIsPending(false);

    toast.success(response?.message);
  }, [token]);

  useEffect(() => {
    setError(false);
    setIsPending(true);
    void onVerify();
  }, [token]);

  return {
    isPending,
    isVerified,
    sendVerificationEmail,
    isError,
  };
};
