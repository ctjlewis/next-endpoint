import { createEndpoint, EndpointParams } from "../createEndpoint";
import type { EndpointFunction } from "./types";
import { NextApiHandler } from "next";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withNextEndpoint = <T>(fn: EndpointFunction<T>, params?: EndpointParams): NextApiHandler => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createEndpoint(fn, params);
};

export * from "./types";