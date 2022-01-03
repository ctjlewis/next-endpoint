import { EndpointFunction, EndpointFunctionArgs } from "../withEndpoint";
import { Session } from "@auth0/nextjs-auth0";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type NextAuthEndpointFunctionArgs<T> =
  SessionInfo & EndpointFunctionArgs<T>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type NextAuthEndpointFunction<T = Record<string, unknown>> =
  (args: NextAuthEndpointFunctionArgs<T>) => ReturnType<EndpointFunction<T>>;