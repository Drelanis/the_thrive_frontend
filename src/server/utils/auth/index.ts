import { apiAuthPrefix, authRoutes, publicRoutes } from '@configs';
import { NextURL } from 'next/dist/server/web/next-url';

export const isApiAuthRoute = (nextUrl: NextURL) => {
  const isAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isAuthRoute) {
    return null;
  }

  return isAuthRoute;
};

export const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.includes(pathname);
};
