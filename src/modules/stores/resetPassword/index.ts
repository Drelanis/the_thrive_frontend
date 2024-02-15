import { ResetPasswordDto } from '@configs';

export const resetPasswordStore: ResetPasswordDto = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};

export * from './validation';
