import { Rubik } from '@configs';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" className={Rubik.className}>
      <body className={styles.container}>{children}</body>
    </html>
  );
};
