import { AuthContainer } from '@common';
import { PropsWithChildren, Suspense } from 'react';

export const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <AuthContainer>
      <Suspense>{children}</Suspense>
    </AuthContainer>
  );
};
