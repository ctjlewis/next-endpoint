/**
 * For [...dynamic] slugs, the all key values are string arrays.
 */
export type SlugEndpointArgs<T> = {
  readonly [key in keyof T]: string[];
};
/**
 * NextJS handlers provide all args from the query string, which means the keys
 * remain but given as strings.
 */
export type EndpointArgs<T> = {
  readonly [key in keyof T]: string | T[key];
};
/**
 * A handler function which accepts the same arguments as the underlying
 * function.
 */
export type Endpoint<T = Record<string,any>> =
  (args: EndpointArgs<T>) => unknown | Promise<unknown>;