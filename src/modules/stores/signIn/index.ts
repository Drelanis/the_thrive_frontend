export type SignInStoreType = {
  email: string;
  password: string;
};

export const signInStore: SignInStoreType = {
  email: '',
  password: '',
};

export * from './validation';
