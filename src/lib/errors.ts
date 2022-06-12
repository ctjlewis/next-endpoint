export interface NextEndpointError {
  error: string;
};

export const toNextEndpointError = (
  err: unknown,
  dontEchoErrors = false,
): NextEndpointError => {
  const isStandardError = err instanceof Error;
  const error =
    dontEchoErrors || !isStandardError
      ? "SERVER ERROR"
      : err.message;

  return {
    error,
  };
}