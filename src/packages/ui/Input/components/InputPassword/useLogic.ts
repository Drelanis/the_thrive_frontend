import { useState } from 'react';

export const useLogic = () => {
  const [isShowPassword, setShowPassword] = useState(false);

  const hidePassword = () => setShowPassword(false);

  const showPassword = () => setShowPassword(true);

  return {
    isShowPassword,
    hidePassword,
    showPassword,
  };
};
