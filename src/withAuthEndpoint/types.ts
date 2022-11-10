import type { ApiFunctionArgs } from "../withEndpoint/types";
import type { GetSession } from "@auth0/nextjs-auth0";

import { NextServerRequest, NextServerResponse } from "../types";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = {
  session: ReturnType<GetSession>;
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
  ResType = unknown,
> = (
  args: ApiAuthFunctionArgs<ReqType>,
  req: NextServerRequest,
  res: NextServerResponse<ResType>,
  // query: NextServerQuery
) => ResType | Promise<ResType>;