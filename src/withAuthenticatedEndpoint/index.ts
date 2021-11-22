import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";
import { HandlerFunction, NextEndpointArgs } from "../withEndpoint";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type AuthenticatedFunction<T> = HandlerFunction<T & SessionInfo>;

export const withAuthenticatedEndpoint = <T>(fn: AuthenticatedFunction<T>): NextApiHandler => {
  const handler: NextApiHandler = async (req, res) => {
    try {
      /**
       * Tell the TypeScript compiler that the request query will be type T.
       *
       * The compiler will correctly warn us that arbitrary types could be fed
       * in at runtime, which is true, because we can call the endpoint with
       * missing query params, which will cause an error. So don't do that.
       */
      const args = req.query as NextEndpointArgs<T>;
      const session = await getSession(req, res);

      if (!session) {
        throw 'Invalid session.';
      }

      const functionArgs = {
        session,
        ...args,
      };

      const result = await fn(functionArgs);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  return withApiAuthRequired(handler);
}

// interface TestArgs {
//   a: number;
//   b: string;
// }

// export const testFn: AuthenticatedFunction<TestArgs> = ({ session, a, b }) => {
//   return { a, b, session };
// }

// export const test = withAuthenticatedEndpoint(testFn);