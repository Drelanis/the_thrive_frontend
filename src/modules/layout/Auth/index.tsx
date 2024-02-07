import { AuthContainer } from '@common';
import { PropsWithChildren } from 'react';

export const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return <AuthContainer>{children}</AuthContainer>;
};
