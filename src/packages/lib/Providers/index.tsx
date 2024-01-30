import { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from './StyledComponentsRegistry';

export const Provider = (props: PropsWithChildren) => {
  const { children } = props;

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};
