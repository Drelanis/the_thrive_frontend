import {
  twoFactorCodeVerification,
  twoFactorDataVerification,
} from '@server/actions/auth/twoFactorToken';

export const handleTwoFactorAuth = async (
  userId: string,
  isTwoFactorEnabled: boolean,
  email: string | null,
  twoFactorCode?: string,
) => {
  if (!email) {
    return;
  }

  if (isTwoFactorEnabled && !twoFactorCode) {
    const response = await twoFactorDataVerification(userId, email);

    if (response) {
      return response;
    }
  }

  if (twoFactorCode) {
    await twoFactorCodeVerification(email, twoFactorCode);
  }
};
