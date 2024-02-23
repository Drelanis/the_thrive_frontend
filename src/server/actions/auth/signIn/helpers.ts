import {
  sendTwoFactor,
  twoFactorCodeVerification,
  twoFactorDataVerification,
} from '@server/actions/auth/twoFactorToken';

export const handleTwoFactorAuth = async (
  userId: string,
  isTwoFactorEnabled: boolean,
  email: string | null,
  twoFactorCode?: string,
) => {
  if (!email || !isTwoFactorEnabled) {
    return;
  }

  if (!twoFactorCode) {
    const isTwoFactorConfirmationExpired =
      await twoFactorDataVerification(userId);

    if (isTwoFactorConfirmationExpired) {
      const response = await sendTwoFactor(email);

      return response;
    }
  }

  if (twoFactorCode) {
    await twoFactorCodeVerification(email, twoFactorCode);
  }
};
