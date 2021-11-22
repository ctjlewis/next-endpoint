import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";
import { createEndpoint } from "../createEndpoint";
import { ApiFunctionArgs } from "../withEndpoint";
import { AuthApiFunction } from "./types";

/**
 * Wrap a function that accepts named arguments of form `{ session: Session,
 * ...args }` with a Next endpoint handler.
 */
export const withAuthEndpoint = <T>(fn: AuthApiFunction<T>): NextApiHandler => {
  const authEndpoint: NextApiHandler = async (req, res) => {
    try {
      /**
       * The args for this function, which will be passed as string values.
       */
      const args = req.query as ApiFunctionArgs<T>;
      /**
       * Auth0 authentication information. Handler throws if not valid.
       */
      const session = await getSession(req, res);
      if (!session) {
        throw 'Invalid session.';
      }
      /**
       * The authenticated endpoint will create a handler which calls the
       * function with the provided args and the current session.
       */
      const endpoint = createEndpoint(async () => {
        return await fn({
          session,
          ...args,
        });
      });
      /**
       * And the output of that handler is returned, passing in the `req` and
       * `res` objects.
       */
      return endpoint(req, res);
    } catch (error) {
      return res.status(403).json(error);
    }
  }
  /**
   * Wrap `withApiAuthRequired` around the endpoint, although this is
   * technically redundant since the wrapper ensures there is a valid session.
   */
  return withApiAuthRequired(authEndpoint);
}

export * from './types';