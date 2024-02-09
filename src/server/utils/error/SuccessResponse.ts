type Params = {
  extraData?: Record<string, unknown>;
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
