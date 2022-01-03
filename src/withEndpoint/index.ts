import { createNextEndpoint, EndpointParams } from "../createEndpoint";
import { NextApiHandler } from "next";
import { EndpointFunction } from "./types";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withNextEndpoint = <T>(fn: EndpointFunction<T>, params?: EndpointParams): NextApiHandler => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createNextEndpoint(fn, params);
};

export * from "./types";