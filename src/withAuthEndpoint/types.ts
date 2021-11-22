import { Session } from "@auth0/nextjs-auth0";
import { NextEndpoint, NextEndpointArgs } from "../withEndpoint";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type NextAuthEndpointArgs<T> =
  SessionInfo & NextEndpointArgs<T>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type NextAuthEndpoint<T = Record<string,any>> =
  (args: NextAuthEndpointArgs<T>) => ReturnType<NextEndpoint<T>>;