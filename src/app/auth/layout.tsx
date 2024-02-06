import { AuthContainer } from '@ui';
import { PropsWithChildren } from 'react';

const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return <AuthContainer>{children}</AuthContainer>;
};

export default AuthLayout;
