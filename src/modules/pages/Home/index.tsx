'use client';

import { Routes } from '@configs';
import Link from 'next/link';

export const Home = () => {
  return <Link href={Routes.SING_IN}>AUTH</Link>;
};
