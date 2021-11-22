import { NextApiHandler } from "next";
import { HandlerFunction, NextEndpointArgs } from "../withEndpoint";

export const createEndpoint = <T>(fn: HandlerFunction<T>): NextApiHandler => {
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