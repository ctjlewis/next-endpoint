import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";
import { NextApiHandler, NextApiRequest } from "next";

export interface EndpointParams {
  method?: "GET" | "POST"
}

/**
 * Parse the Next.js handler arguments from a request given endpoint params.
 * 
 * @returns The parsed arguments. 
 */
export const getHandlerArgs = <T>(req: NextApiRequest, params: EndpointParams = {}): ApiFunctionArgs<T> => {
  const { method = "GET" } = params;
  /**
   * Load args from req.query for GET requests and req.body for POST requests.
   */
  const requestData =
    method === "GET"
      ? req.query
      : JSON.parse(req.body);

  return requestData;
};

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
    /**
     * Execute the API function and respond with the output.
     */
    try {
      const args = getHandlerArgs<T>(req, params);
      const result = await fn(args);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  return handler;
};