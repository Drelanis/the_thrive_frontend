import { UserRoles } from '@configs';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  agent: string;
  emailVerified: Date | null;
  firstName: string | null;
  isTwoFactorEnabled: boolean;
  lastName: string | null;
  name: string | null;
  role: UserRoles;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
