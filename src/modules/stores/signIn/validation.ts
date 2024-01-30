import { ValidationHints } from '@configs';
import * as yup from 'yup';

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .email(ValidationHints.INVALID_EMAIL),
  password: yup.string().required(ValidationHints.REQUIRED),
});
