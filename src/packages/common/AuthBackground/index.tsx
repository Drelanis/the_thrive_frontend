import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const AuthBackground = (props: PropsWithChildren) => {
  const { children } = props;

  return <main className={styles.container}>{children}</main>;
};
