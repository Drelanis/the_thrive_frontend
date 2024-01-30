import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import styles from './styles.module.scss';

export const Title = () => {
  return (
    <Box className={styles.titleContainer}>
      <Typography className={styles.header}>Welcome back</Typography>
      <Box className={styles.subHeaderContainer}>
        <Typography>Don't have an account?</Typography>
        <Link className={styles.link} passHref href="/signup">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};
