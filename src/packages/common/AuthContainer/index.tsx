import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const AuthContainer = (props: PropsWithChildren) => {
  const { children } = props;

  return <Box className={styles.container}>{children}</Box>;
};
