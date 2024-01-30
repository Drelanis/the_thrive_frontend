import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from './StyledComponentsRegistry';

export const Provider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </AppRouterCacheProvider>
  );
};
