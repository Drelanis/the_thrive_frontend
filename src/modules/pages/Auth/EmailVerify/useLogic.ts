import { emailVerify, repeatMailVerification } from '@server';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export const useLogic = () => {
  const searchParams = useSearchParams();

  const [isVerified, setVerified] = useState(false);

  const token = searchParams.get('token');

  const [isPending, setTransition] = useTransition();

  const onVerify = () => {
    setTransition(async () => {
      if (!token) {
        toast.error('Something went wrong!');

        return;
      }

      const data = await emailVerify(token);

      if (data?.isError) {
        toast.error(data.message);

        return;
      }

      setVerified(true);

      toast.success(data?.message);
    });
  };

  const sendVerificationEmail = () => {
    setTransition(async () => {
      const response = await repeatMailVerification(token || '');

      if (response?.isError) {
        toast.error(response.message);

        return;
      }

      toast.success(response?.message);
    });
  };

  useEffect(() => {
    setVerified(false);
    onVerify();
  }, [token]);

  return {
    isPending,
    isVerified,
    sendVerificationEmail,
  };
};
