export type SigninDto = {
  email: string;
  password: string;
  twoFactorCode?: string;
};

export type NewPasswordDto = {
  newPassword: string;
  repeatNewPassword: string;
};

export type ResetPasswordDto = {
  email: string;
};

export type SignUpDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};
