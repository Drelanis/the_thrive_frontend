import { Rubik } from '@configs';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'TheThrive',
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" className={Rubik.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
