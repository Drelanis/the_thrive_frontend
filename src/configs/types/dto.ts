import { Countries } from '../constants';

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

export type OfficeAddressDtoType = {
  city: string;
  country: Countries | '';
  region: string;
  state: string;
  street: string;
  zipCode: string;
};

export type CompanyDtoType = {
  address: OfficeAddressDtoType[];
  directions: string[];
  email: string;
  name: string;
  numberOfEmployee: string;
};
