import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";
import { NextApiRequest } from "next";
import { NextEndpointHandler } from "../types";
import { toNextEndpointError } from "./errors";

export interface EndpointParams {
  /**
   * The request method to accept data for. Defaults to GET (REST).
   */
  method?: "GET" | "POST";
  /**
   * If set to `manual`, the endpoint will expect you to handle all of the `res`
   * object manipulation, e.g. `res.status(...).send(...)`.
   */
  mode?: "automatic" | "manual";
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
export const createEndpoint = <ReqType, ResType = unknown>(
  fn: ApiFunction<ReqType, ResType>,
  params: EndpointParams = {},
  dontEchoErrors = false
): NextEndpointHandler<ResType> => {
  const { mode = "automatic" } = params;
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
      const result = await fn(args, req, res);

      if (mode === "manual") {
        return;
      }

      return res.status(200).json(result);
    } catch (error) {
      const errorMessage = toNextEndpointError(error, dontEchoErrors);
      return res.status(400).json(errorMessage);
    }
  };

  return handler;
};