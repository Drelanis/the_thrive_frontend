/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable func-names */
import { ValidationHints } from '@configs';
import { MAX_PASSWORD_VALUE } from '@configs/constants';
import * as yup from 'yup';

export const newPasswordValidationSchema = yup.object({
  newPassword: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .min(MAX_PASSWORD_VALUE, ValidationHints.PASSWORD_SHORT),
  repeatNewPassword: yup
    .string()
    .required(ValidationHints.REQUIRED)
    .test(
      'passwords-match',
      ValidationHints.PASSWORDS_MISMATCH,
      function (value) {
        return this.parent.newPassword === value;
      },
    ),
});
