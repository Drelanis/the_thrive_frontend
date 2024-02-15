import { ValidationHints } from '@configs';
import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .email(ValidationHints.INVALID_EMAIL),
});
