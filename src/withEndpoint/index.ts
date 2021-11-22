import { createEndpoint } from "../createEndpoint";
import { NextEndpoint } from "./types";

/**
 * Create a simple endpoint from a function that accepts named parameters.
 * 
 * @param fn The function to wrap with a handler.
 */
export const withEndpoint = <T>(fn: NextEndpoint<T>) => {
  /**
   * For a simple endpoint, we only need to create the handler and return it.
   */
  return createEndpoint(fn);
}

export * from './types'