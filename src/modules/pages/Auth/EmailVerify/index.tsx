'use client';

import { AuthContainer, AuthTitle } from '@common';
import { Toast } from '@ui';

import { ErrorBody } from './components';
import { SpinnerStyled, SuccessIcon } from './styles';
import { useLogic } from './useLogic';

export const EmailVerify = () => {
  const { isPending, isVerified, sendVerificationEmail } = useLogic();

  return (
    <AuthContainer>
      <AuthTitle header="Authorization" subHeader="Confirm email" />
      {isVerified && !isPending && <SuccessIcon />}
      {isPending && <SpinnerStyled size="10rem" />}
      {!isVerified && !isPending && (
        <ErrorBody isPending={isPending} onClick={sendVerificationEmail} />
      )}
      <Toast />
    </AuthContainer>
  );
};
