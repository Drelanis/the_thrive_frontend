export const getErrorResponse = (error: unknown, response?: object) => {
  if (error instanceof Error) {
    const errorMessage = error.message;

    return { isError: true, message: errorMessage, ...response };
  }

  return null;
};
