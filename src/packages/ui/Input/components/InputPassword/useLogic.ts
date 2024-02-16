import { useCallback, useState } from 'react';

export const useLogic = () => {
  const [isShowPassword, setShowPassword] = useState(false);

  const hidePassword = useCallback(
    () => setShowPassword(false),
    [setShowPassword],
  );

  const showPassword = useCallback(
    () => setShowPassword(true),
    [setShowPassword],
  );

  return {
    isShowPassword,
    hidePassword,
    showPassword,
  };
};
