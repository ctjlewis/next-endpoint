import type { NextApiRequest, NextApiResponse } from "next/types";

/**
 * For [...dynamic] slugs, the all key values are string arrays.
 */
export type SlugApiFunctionArgs<ReqType> = {
  readonly [key in keyof ReqType]: string[] | ReqType[key] | undefined;
};
/**
 * NextJS handlers provide all args from the query string, which means the keys
 * remain but given as strings.
 */
export type ApiFunctionArgs<ReqType> = {
  readonly [key in keyof ReqType]: string | ReqType[key] | undefined;
};
/**
 * A function that will be wrapped with a handler and called with the same args.
 */
export type ApiFunction<
  ReqType = Record<string, unknown>,
  ResType = unknown,
> = (
  args: ApiFunctionArgs<ReqType>,
  req?: NextApiRequest,
  res?: NextApiResponse
) => ResType | Promise<ResType>;
