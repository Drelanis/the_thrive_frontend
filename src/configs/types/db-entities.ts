import { User } from '@prisma/client';

export type {
  VerificationToken as VerificationTokenType,
  UserRole as UserRoleType,
} from '@prisma/client';

export type UserType = User & { userAgent?: string };
