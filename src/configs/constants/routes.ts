export enum Routes {
  HOME = '/',
  SING_IN = '/auth/signIn',
  SING_UP = '/auth/signUp',
  DASHBOARD = '/dashboard',
}

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/signIn', '/auth/signUp'];

/**
 * An array of routes that are accessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';
