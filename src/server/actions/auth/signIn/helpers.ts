import { sendTwoFactorTokenEmail } from '@lib';
import { SuccessResponse } from '@server/utils';

// eslint-disable-next-line import/no-cycle
import {
  deleteTwoFactorToken,
  generateTwoFactorToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  updateTwoFactorConfirmation,
} from '../twoFactorToken';

export const sendTwoFactor = async (email: string) => {
  const twoFactorToken = await generateTwoFactorToken(email);

  await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

  return SuccessResponse({
    message: 'Confirm two-factor authentication!',
    extraData: { isTwoFactor: true },
  });
};

export const twoFactorDataVerification = async (
  userId: string,
  email: string,
) => {
  const tokenConfirmation = await getTwoFactorConfirmationByUserId(userId);

  if (!tokenConfirmation) {
    throw new Error('Something went wrong');
  }

  let expired = false;

  if (tokenConfirmation?.expires) {
    expired = new Date() > tokenConfirmation?.expires;
  }

  if (expired) {
    const response = await sendTwoFactor(email);

    return response;
  }
};

export const twoFactorCodeVerification = async (
  email: string,
  twoFactorCode: string,
) => {
  const twoFactorToken = await getTwoFactorTokenByEmail(email);

  const isCodeMatch = twoFactorToken!.token === twoFactorCode;

  if (!isCodeMatch) {
    throw new Error('Invalid code!');
  }

  await deleteTwoFactorToken(twoFactorToken!.id);

  await updateTwoFactorConfirmation(email);
};
