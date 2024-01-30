'use client';

import { Box } from '@mui/material';

import { SignInForm, Title } from './components';
import styles from './styles.module.scss';

export const SignInPage = () => {
  return (
    <Box className={styles.container}>
      <Title />
      <SignInForm />
    </Box>
  );
};
