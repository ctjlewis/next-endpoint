/**
 * For [...dynamic] slugs, the all key values are string arrays.
 */
export type SlugEndpointFunctionArgs<T> = {
  readonly [key in keyof T]: string[] | T[key];
};
/**
 * NextJS handlers provide all args from the query string, which means the keys
 * remain but given as strings.
 */
export type EndpointFunctionArgs<T> = {
  readonly [key in keyof T]: string | T[key];
};
/**
 * A function that will be wrapped with a handler and called with the same args.
 */
export type EndpointFunction<T = Record<string, unknown>> =
  (args: EndpointFunctionArgs<T>) => unknown | Promise<unknown>;