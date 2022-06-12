import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";
import { NextApiRequest } from "next";
import { NextEndpointHandler } from "../types";

export interface EndpointParams {
  method?: "GET" | "POST"
}

/**
 * Parse the Next.js handler arguments from a request given endpoint params.
 * 
 * @returns The parsed arguments. 
 */
export const getHandlerArgs = <ReqType>(
  req: NextApiRequest,
  params: EndpointParams = {}
): ApiFunctionArgs<ReqType> => {
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
export const createEndpoint = <ReqType, ResType = any>(
  fn: ApiFunction<ReqType, ResType>,
  params: EndpointParams = {}
): NextEndpointHandler<ResType> => {
  /**
   * Create a handler from the API function which will accept args from the
   * request and return a response.
   */
  const handler: NextEndpointHandler<ResType> = async (req, res) => {
    /**
     * Execute the API function and respond with the output.
     */
    try {
      const args = getHandlerArgs<ReqType>(req, params);
      const result = await fn(args);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  return handler;
};