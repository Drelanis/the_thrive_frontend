import { Rubik } from '@configs';
import { Provider } from '@lib';
import { PropsWithChildren } from 'react';

import 'normalize.css/normalize.css';

export const metadata = {
  title: 'TheThrive',
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" className={Rubik.className}>
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
};

export default RootLayout;
