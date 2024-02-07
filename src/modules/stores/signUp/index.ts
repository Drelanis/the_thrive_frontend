import { SignUpDto } from '@configs';

export const signUpStore: SignUpDto = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export * from './validation';
