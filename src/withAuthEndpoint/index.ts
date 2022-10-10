import type { ApiAuthFunction } from "./types";

import { createEndpoint, EndpointParams } from "../lib/createEndpoint";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ApiFunctionArgs } from "../withEndpoint";
import { NextEndpointHandler } from "../types";
import { toNextEndpointError } from "../lib/errors";

/**
 * Wrap a function that accepts named arguments of form `{ session: Session,
 * ...args }` with a Next endpoint handler.
 */
export const withAuthEndpoint = <ReqType, ResType>(
  fn: ApiAuthFunction<ReqType, ResType>,
  /**
   * Request parameters (e.g. method).
   */
  params?: EndpointParams,
  /**
   * Whether to prevent echoing errors into the server response.
   */
  dontEchoErrors = false
): NextEndpointHandler<ResType> => {
  if (typeof window !== "undefined" || typeof document !== "undefined") {
    throw "Auth Endpoints can only be used in a server context.";
  }

  const authEndpoint: NextEndpointHandler<ResType> = async (req, res) => {
    try {
      /**
       * The args for this function, which will be passed as string values. A
       * type assertion is needed because we do not know what data will actually
       * be provided to the endpoint.
       * 
       * We want TypeScript to assert the type here, but note in the return type
       * that the values could be something like `string | string[] | undefined`.
       */
      const args = req.query as ApiFunctionArgs<ReqType>;
      /**
       * Auth0 authentication information. Handler throws if not valid.
       */
      const session = await getSession(req, res);
      if (!session) throw "Invalid session.";
      /**
       * The authenticated endpoint will create a handler which calls the
       * function with the provided args and the current session.
       */
      const endpoint = createEndpoint<ReqType, ResType>(
        async () => await fn({ session, ...args }),
        params,
        dontEchoErrors
      );
      /**
       * And the output of that handler is returned, passing in the `req` and
       * `res` objects.
       */
      return endpoint(req, res);
    } catch (error) {
      const errorMessage = toNextEndpointError(error, dontEchoErrors);
      return res.status(403).json(errorMessage);
    }
  };
  /**
   * Wrap `withApiAuthRequired` around the endpoint, although this is
   * technically redundant since the wrapper ensures there is a valid session.
   */
  return withApiAuthRequired(authEndpoint);
};

export * from "./types";