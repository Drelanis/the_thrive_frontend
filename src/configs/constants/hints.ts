export enum ValidationHints {
  REQUIRED = 'This field is required',
  INVALID_EMAIL = 'This field must be valid email',
  PASSWORDS_MISMATCH = "Passwords don't match",
  PASSWORD_SHORT = 'Password is too short, at least six characters',
  TWO_FACTOR_SHORT = 'Two factor code is too short, at least six characters',
  EQUALITY_OF_THE_NEW_PASSWORD = 'The new password must not be the same as the old one',
}

export enum ErrorHints {
  BUSY_EMAIL = 'A company with this email address has already been created',
  EMAIL_NOT_EXIST = 'Email does not exist!',
  PASSWORD_MATCH = 'The old and new passwords must not be the same!',
  EMAIL_NOT_FOUND = 'Email not found!',
  COMMON_ERROR = 'Something went wrong!',
  TWO_FACTOR_WRONG = 'Invalid code!',
}

export enum MessageHints {
  RESET_EMAIL = 'Reset email sent!',
  CONFIRM_TWO_FACTOR = 'Confirm two-factor authentication!',
}
