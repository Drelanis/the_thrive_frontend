export enum Routes {
  HOME = '/',
  SING_IN = '/auth/signIn',
  SING_UP = '/auth/signUp',
  EMAIL_VERIFY = '/auth/email-verify',
  NEW_PASSWORD = '/auth/new-password',
  RESET_PASSWORD = '/auth/reset-password',
  DASHBOARD = '/dashboard',
  API_AUTH_SIGN_IN = '/api/api-auth/signIn',
  API_AUTH_SIGN_UP = '/api/api-auth/signUp',
  API_AUTH_SIGN_OUT = '/api/api-auth/signOut',
  API_AUTH_REFRESH_SESSION = '/api/api-auth/refresh',
}

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = [
  Routes.SING_IN,
  Routes.SING_UP,
  Routes.RESET_PASSWORD,
  Routes.NEW_PASSWORD,
];

/**
 * An array of routes that are accessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  Routes.HOME,
  Routes.EMAIL_VERIFY,
  Routes.API_AUTH_SIGN_IN,
  Routes.API_AUTH_SIGN_OUT,
  Routes.API_AUTH_REFRESH_SESSION,
  Routes.API_AUTH_SIGN_UP,
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';
