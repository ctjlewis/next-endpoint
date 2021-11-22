import { Session } from "@auth0/nextjs-auth0";
import { Endpoint, EndpointArgs } from "../withEndpoint";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type AuthEndpointArgs<T> =
  SessionInfo & EndpointArgs<T>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type AuthEndpoint<T = Record<string,any>> =
  (args: AuthEndpointArgs<T>) => ReturnType<Endpoint<T>>;