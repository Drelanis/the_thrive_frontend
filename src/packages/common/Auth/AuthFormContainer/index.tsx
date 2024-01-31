'use client';

import { FormEvent, PropsWithChildren } from 'react';

import { FormContainer } from './styles';

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
} & PropsWithChildren;

export const AuthFormContainer = (props: Props) => {
  const { children, onSubmit } = props;

  return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>;
};
