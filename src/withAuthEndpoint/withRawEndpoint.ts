// import type { ApiAuthFunction } from "./types";
// import { TokenSet } from "openid-client";

// import { env } from "process";

// import { createEndpoint, EndpointParams } from "../lib/createEndpoint";
// import { ApiFunctionArgs } from "../withEndpoint";
// import { NextEndpointHandler } from "../types";
// import { fromTokenSet } from "@auth0/nextjs-auth0/dist/session";
// import { toNextEndpointError } from "../lib/errors";
// import { getConfig } from "@auth0/nextjs-auth0/dist/auth0-session";
// import { verify } from "njwt";

// /**
//  * This wrapper simply verifies that the Authorization: Bearer token is a valid
//  * Auth0 JWT, without respect to the frontend.
//  */
// export const withRawAuthEndpoint = <ReqType, ResType>(
//   fn: ApiAuthFunction<ReqType, ResType>,
//   /**
//    * Request parameters (e.g. method).
//    */
//   params?: EndpointParams,
//   /**
//    * Whether to prevent echoing errors into the server response.
//    */
//   dontEchoErrors = false
// ): NextEndpointHandler<ResType> => {
//   if (typeof window !== "undefined" || typeof document !== "undefined") {
//     throw "Auth Endpoints can only be used in a server context.";
//   }

//   const rawAuthEndpoint: NextEndpointHandler<ResType> = async (
//     req, 
//     res,
//   ) => {
//     try {
//       const { query } = req;
//       /**
//        * The args for this function, which will be passed as string values. A
//        * type assertion is needed because we do not know what data will actually
//        * be provided to the endpoint.
//        * 
//        * We want TypeScript to assert the type here, but note in the return type
//        * that the values could be something like `string | string[] | undefined`.
//        */
//       const args = query as ApiFunctionArgs<ReqType>;

//       console.log("REQ.HEADERS", req.headers);

//       const { authorization } = req.headers;
//       if (typeof authorization !== "string") {
//         throw "Invalid Authorization header provided.";
//       }

//       const accessToken = authorization.replace("Bearer ", "");
//       const verified = verify(accessToken);


//       // const tokenSet = new TokenSet({
//       //   access_token: accessToken,
//       // });

//       // const config = getConfig({
//       //   secret: env.AUTH0_SECRET,
//       //   baseURL: env.AUTH0_BASE_URL,
//       //   clientID: env.AUTH0_CLIENT_ID,
//       //   issuerBaseURL: env.AUTH0_ISSUER_BASE_URL,
//       //   routes: {
//       //     callback: "/",
//       //   }
//       // });

//       // const session = fromTokenSet(tokenSet, config);
//       // console.log({ session });
//       // if (!session) {
//       //   throw "Invalid session.";
//       // }
//       /**
//        * The authenticated endpoint will create a handler which calls the
//        * function with the provided args and the current session.
//        */
//       const endpoint = createEndpoint<ReqType, ResType>(
//         // async () => await fn({ session, ...args }, req, res, query),
//         async () => await fn({ session, ...args }, req, res),
//         params,
//         dontEchoErrors
//       );
//       /**
//        * And the output of that handler is returned, passing in the `req` and
//        * `res` objects.
//        */
//       // return endpoint(req, res, query);
//       return endpoint(req, res);
//     } catch (e) {
//       const error = toNextEndpointError(e, dontEchoErrors);
//       console.log(error);
      
//       res.statusCode = 403;
//       res.setHeader("Content-Type", "application/json");
//       return res.end(JSON.stringify(error));
//     }
//   };
  
//   return rawAuthEndpoint;
// };

// export * from "./types";