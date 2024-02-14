import { ValidationHints } from '@configs';
import { MAX_PASSWORD_VALUE } from '@configs/constants';
import * as yup from 'yup';

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .email(ValidationHints.INVALID_EMAIL),
  password: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .min(MAX_PASSWORD_VALUE, ValidationHints.PASSWORD_SHORT),
  twoFactorCode: yup.string().optional(),
});
