type Params = {
  extraData?: {
    isRedirect?: boolean;
    isTwoFactor?: boolean;
  };
  message?: string;
};

export const SuccessResponse = (params: Params) => {
  const { extraData, ...restParams } = params;

  return {
    isError: false,
    ...extraData,
    ...restParams,
  };
};
