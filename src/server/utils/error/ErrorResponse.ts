import { DEFAULT_ERROR } from '@configs';

type Params = {
  error?: unknown;
  extraData?: Record<string, unknown>;
  message?: string;
};

export const ErrorResponse = (params: Params) => {
  const { error, extraData, message } = params;

  if (error instanceof Error) {
    if (error.message === 'NEXT_REDIRECT') {
      return;
    }

    if (error.name === DEFAULT_ERROR) {
      return {
        isError: true,
        isTwoFactor: false,
        message: error.message,
        ...extraData,
      };
    }

    return {
      isError: true,
      message: 'Something went wrong',
      isTwoFactor: false,
      cause: error.name,
      ...extraData,
    };
  }

  return {
    isError: true,
    message,
    isTwoFactor: false,
    ...extraData,
  };
};
