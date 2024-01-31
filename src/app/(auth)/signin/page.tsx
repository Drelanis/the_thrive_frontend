'use client';

import { SignInPage } from '@modules';
import { Box } from '@mui/material';
import { Toast } from '@ui';

import styles from './styles.module.scss';

const SignIn = () => {
  return (
    <main>
      <Box className={styles.container}>
        <SignInPage />
        <Toast />
      </Box>
    </main>
  );
};

export default SignIn;
