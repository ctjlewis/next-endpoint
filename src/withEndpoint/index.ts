import { NextApiHandler } from "next";

/**
 * NextJS handlers provide all args from the query string, which means the keys
 * remain but given as strings.
 */
export type NextEndpointArgs<T> = {
  readonly [key in keyof T]: string;
};
/**
 * For [...dynamic] slugs, the all key values are string arrays.
 */
export type NextSlugArgs<T> = {
  readonly [key in keyof T]: string[];
}

export type HandlerFunction<T> =
  (args: NextEndpointArgs<T>) => unknown | Promise<unknown>;

export const withEndpoint = <T>(fn: HandlerFunction<T>): NextApiHandler => {
  const handler: NextApiHandler = async (req, res) => {
    try {
      /**
       * Tell the TypeScript compiler that the request query will be type
       * NextEndpointArgs<T>.
       *
       * The compiler will correctly warn us that arbitrary types could be fed
       * in at runtime, which is true, because we can call the endpoint with
       * missing query params, which will cause an error. So don't do that.
       */
      const args = req.query as NextEndpointArgs<T>;
      const functionArgs: NextEndpointArgs<T> = args;
      const result = await fn(functionArgs);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  return handler;
}

// interface TestArgs {
//   a: number;
//   b: string;
// }

// export const testFn: AuthenticatedFunction<TestArgs> = ({ session, a, b }) => {
//   return { a, b, session };
// }

// export const test = withAuthenticatedEndpoint(testFn);