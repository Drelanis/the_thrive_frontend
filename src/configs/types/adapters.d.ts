import { EmployeeRoles } from '@server';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: EmployeeRoles;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
