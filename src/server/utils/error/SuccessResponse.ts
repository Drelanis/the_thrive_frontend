type Params = {
  message: string;
  extraData?: Record<string, unknown>;
};

export const SuccessResponse = (params: Params) => {
  const { extraData, ...restParams } = params;

  return {
    isError: false,
    ...extraData,
    ...restParams,
  };
};
