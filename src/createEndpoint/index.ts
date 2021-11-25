import { NextApiHandler } from "next";
import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";

export interface EndpointParams {
  method?: 'GET' | 'POST'
}

/**
 * Create a Next.js endpoint handler from an API function.
 * 
 * @param fn The function to wrap with a handler.
 * @param params Endpoint configuration information.
 * @returns The created Next.js handler.
 */
export const createEndpoint = <T>(fn: ApiFunction<T>, params: EndpointParams = {}): NextApiHandler => {
  /**
   * Create a handler from the API function which will accept args from the
   * request and return a response.
   */
  const handler: NextApiHandler = async (req, res) => {
    const { method = 'GET' } = params;
    /**
     * Load args from req.query for GET requests and req.body for POST requests.
     */
    const requestData =
      method === 'GET'
        ? req.query
        : JSON.parse(req.body);
    /**
     * Execute the API function and respond with the output.
     */
    try {
      /**
       * Tell the TypeScript compiler that the request query will be type
       * NextEndpointArgs<T>.
       *
       * The compiler will correctly warn us that arbitrary types could be fed
       * in at runtime, which is true, because we can call the endpoint with
       * missing query params, which will cause an error. So don't do that.
       */
      const args = requestData as ApiFunctionArgs<T>;
      const result = await fn(args);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  return handler;
}