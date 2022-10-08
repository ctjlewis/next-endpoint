import type { ApiFunction, ApiFunctionArgs } from "../withEndpoint/types";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { IncomingMessage } from "http";
import type { ServerResponse } from "http";
import type { Session } from "@auth0/nextjs-auth0";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = {
  session: Session
};
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type ApiAuthFunctionArgs<ReqType> =
  SessionInfo & ApiFunctionArgs<ReqType>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type ApiAuthFunction<
  ReqType = Record<string, unknown>,
  ResType = unknown
> = (
  args: ApiAuthFunctionArgs<ReqType>,
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse | NextApiResponse<ResType>,
) => ReturnType<ApiFunction<ReqType, ResType>>;