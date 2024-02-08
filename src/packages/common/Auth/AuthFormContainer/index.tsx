'use client';

import { PropsWithChildren } from 'react';

import { StyledFormControl } from './styles';

export const AuthFormContainer = (props: PropsWithChildren) => {
  const { children } = props;

  return <StyledFormControl>{children}</StyledFormControl>;
};
