import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'TheThrive',
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
