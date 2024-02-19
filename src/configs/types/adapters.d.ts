import { UserRoles } from '@configs';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  emailVerified: Date;
  isTwoFactorEnabled: boolean;
  role: UserRoles;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
