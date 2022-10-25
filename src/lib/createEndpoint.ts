import { USE_GOOGLE_ANALYTICS } from "../globals";

import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";
import { NextApiRequest } from "next";
import { NextEndpointHandler } from "../types";
import { googleAnalytics } from "node-google-analytics";
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
  params: EndpointParams = {},
  // query?: GetServerSidePropsContext["query"]
): ApiFunctionArgs<ReqType> => {
  const { method = "GET" } = params;

  if (method === "POST") {
    /**
     * Load args from req.body for POST requests.
     */
    if (!("body" in req)) {
      throw "POST request did not include body.";
    }

    return JSON.parse(req.body);
  } else {
    /**
     * Load args from req.query for GET requests.
     */
    return req.query as ApiFunctionArgs<ReqType>;
  }
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
  const { mode = "automatic", method = "GET" } = params;
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
      // const result = await fn(args, req, res, req.query);
      const result = await fn(args, req, res);

      if (USE_GOOGLE_ANALYTICS) {
        const { cookies } = req;
        await googleAnalytics(
          { cookies }, 
          {
            name: "endpoint",
            params: {
              method,
              endpoint: req.url ?? "unknown",
            }
          }
        );
      }

      if (mode === "manual") {
        return res;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(result));
    } catch (error) {
      const errorMessage = toNextEndpointError(error, dontEchoErrors);

      if (USE_GOOGLE_ANALYTICS) {
        const { cookies } = req;
        await googleAnalytics(
          { cookies }, 
          {
            name: "endpointFailure",
            params: {
              method,
              endpoint: req.url ?? "unknown",
            }
          }
        );
      }
      
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(errorMessage));
    }
  };

  return handler;
};