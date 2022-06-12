import { createEndpoint, EndpointParams } from "../lib/createEndpoint";
import type { ApiFunction } from "./types";
import { NextApiHandler } from "next";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withEndpoint = <T>(fn: ApiFunction<T>, params?: EndpointParams): NextApiHandler<T> => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createEndpoint(fn, params);
};

export * from "./types";