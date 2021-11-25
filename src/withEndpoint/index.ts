import { NextApiHandler } from "next";
import { createEndpoint, EndpointParams } from "../createEndpoint";
import { ApiFunction } from "./types";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withEndpoint = <T>(fn: ApiFunction<T>, params: EndpointParams): NextApiHandler => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createEndpoint(fn, params);
}

export * from './types'