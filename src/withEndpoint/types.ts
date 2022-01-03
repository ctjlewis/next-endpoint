/**
 * For [...dynamic] slugs, the all key values are string arrays.
 */
export type SlugApiFunctionArgs<T> = {
  readonly [key in keyof T]: string[] | T[key];
};
/**
 * NextJS handlers provide all args from the query string, which means the keys
 * remain but given as strings.
 */
export type ApiFunctionArgs<T> = {
  readonly [key in keyof T]: string | T[key];
};
/**
 * A function that will be wrapped with a handler and called with the same args.
 */
export type ApiFunction<T = Record<string, unknown>> =
  (args: ApiFunctionArgs<T>) => unknown | Promise<unknown>;