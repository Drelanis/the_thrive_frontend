import { SignUpDto } from '@configs';

export const signUpStore: SignUpDto = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export * from './validation';
