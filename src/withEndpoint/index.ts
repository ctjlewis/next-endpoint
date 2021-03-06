import { createEndpoint, EndpointParams } from "../lib/createEndpoint";
import type { ApiFunction } from "./types";
import { NextEndpointHandler } from "../types";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withEndpoint = <ReqType, ResType>(
  fn: ApiFunction<ReqType, ResType>,
  /**
   * Request parameters (e.g. method).
   */
  params?: EndpointParams,
  /**
   * Whether to prevent echoing errors into the server response.
   */
  dontEchoErrors = false
): NextEndpointHandler<ResType> => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createEndpoint<ReqType, ResType>(fn, params, dontEchoErrors);
};

export * from "./types";