import { NewPasswordDto } from '@configs';

export const newPasswordStore: NewPasswordDto = {
  newPassword: '',
  repeatNewPassword: '',
};

export * from './validation';
