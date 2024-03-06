import { User } from '@prisma/client';

export type {
  VerificationToken as VerificationTokenType,
  UserRole as UserRoleType,
  Company as CompanyCreationType,
  Direction as CompanyDirectionType,
  OfficeAddress as CompanyOfficeAddressType,
} from '@prisma/client';

export type UserType = User & { userAgent?: string };
