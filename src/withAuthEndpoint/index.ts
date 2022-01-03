import { createEndpoint, EndpointParams } from "../createEndpoint";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import type { AuthEndpointFunction } from "./types";
import { EndpointFunctionArgs } from "../withEndpoint";
import { NextApiHandler } from "next";

/**
 * Wrap a function that accepts named arguments of form `{ session: Session,
 * ...args }` with a Next endpoint handler.
 */
export const withAuthEndpoint = <T>(fn: AuthEndpointFunction<T>, params?: EndpointParams): NextApiHandler => {
  const authEndpoint: NextApiHandler = async (req, res) => {
    try {
      /**
       * The args for this function, which will be passed as string values. A
       * type assertion is needed because we do not know what data will actually
       * be provided to the endpoint.
       */
      const args = req.query as EndpointFunctionArgs<T>;
      /**
       * Auth0 authentication information. Handler throws if not valid.
       */
      const session = await getSession(req, res);
      if (!session) throw "Invalid session.";
      /**
       * The authenticated endpoint will create a handler which calls the
       * function with the provided args and the current session.
       */
      const endpoint = createEndpoint(
        async () => await fn({ session, ...args }),
        params
      );
      /**
       * And the output of that handler is returned, passing in the `req` and
       * `res` objects.
       */
      return endpoint(req, res);
    } catch (error) {
      return res.status(403).json(error);
    }
  };
  /**
   * Wrap `withApiAuthRequired` around the endpoint, although this is
   * technically redundant since the wrapper ensures there is a valid session.
   */
  return withApiAuthRequired(authEndpoint);
};

export * from "./types";