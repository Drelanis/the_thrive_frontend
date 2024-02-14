export const MAX_PASSWORD_VALUE = 6;
export const MAX_TWO_FACTOR_VALUE = 6;
export const EMAIL_VERIFICATION_TOKEN_EXPIRES = 60;
export const TWO_FACTOR_TOKEN_EXPIRES = 5;

export enum Providers {
  GOOGLE = 'google',
  GITHUB = 'github',
  CREDENTIALS = 'credentials',
}

export enum UserRoles {
  USER = 'USER',
  COMPANY = 'COMPANY',
}
