import { Session } from "@auth0/nextjs-auth0";
import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type AuthApiFunctionArgs<T> =
  SessionInfo & ApiFunctionArgs<T>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type AuthApiFunction<T = Record<string,any>> =
  (args: AuthApiFunctionArgs<T>) => ReturnType<ApiFunction<T>>;