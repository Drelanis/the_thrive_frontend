import { Routes } from '@configs';
import authConfig from '@server/nextAuth';
import { isApiAuthRoute, isAuthRoute, isPublicRoute } from '@server/utils';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  const isLoggedIn = Boolean(session);

  const isApiAuth = isApiAuthRoute(nextUrl);

  const isPublic = isPublicRoute(nextUrl.pathname);

  const isAuth = isAuthRoute(nextUrl.pathname);

  if (isApiAuth) {
    return null;
  }

  if (isAuth) {
    if (isLoggedIn) {
      return Response.redirect(new URL(Routes.DASHBOARD, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublic) {
    return Response.redirect(new URL(Routes.SING_IN, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
