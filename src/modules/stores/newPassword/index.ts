import { NewPasswordDto } from '@configs';

export const newPasswordStore: NewPasswordDto = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};

export * from './validation';
