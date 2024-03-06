export const MAX_PASSWORD_VALUE = 6;
export const MAX_TWO_FACTOR_VALUE = 6;
export const EMAIL_VERIFICATION_TOKEN_EXPIRES = 60;
export const RESET_TOKEN_EXPIRES = 5;
export const TWO_FACTOR_TOKEN_EXPIRES = 5;

export const SESSION_EXPIRATION = 86400;
export const SESSION_EXPIRATION_HOURS = '24h';

export const SESSION_UPDATE_AGE = 300;

export enum Providers {
  GOOGLE = 'google',
  GITHUB = 'github',
  CREDENTIALS = 'credentials',
}

export enum UserRoles {
  USER = 'USER',
  COMPANY = 'COMPANY',
}

export enum Countries {
  USA = 'USA',
  Ukraine = 'Ukraine',
}
