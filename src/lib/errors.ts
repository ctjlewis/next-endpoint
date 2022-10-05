export interface NextEndpointError {
  error: string;
}

export const toNextEndpointError = (
  error: unknown,
  dontEchoErrors = false,
): NextEndpointError => {
  const isStandardError = error instanceof Error;

  if (dontEchoErrors) {
    return {
      error: "Server error (silenced).",
    };
  }

  if (isStandardError) {
    return { error: error.message };
  } else if (typeof error === "string") {
    return { error };
  } else {
    return { error: "An error of type other than String or Error was thrown." };
  }

};