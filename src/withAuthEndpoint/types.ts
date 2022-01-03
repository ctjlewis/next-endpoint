import { ApiFunction, ApiFunctionArgs } from "../withEndpoint";
import { Session } from "@auth0/nextjs-auth0";

/**
 * Contains a { session } property with our Auth0 session.
 */
export type SessionInfo = { session: Session };
/**
 * Next handler arguments and a { session: Session } containing the Auth0
 * session.
 */
export type ApiAuthFunctionArgs<T> =
  SessionInfo & ApiFunctionArgs<T>;
/**
 * The authenticated function will be given a { session: Session } argument.
 */
export type ApiAuthFunction<T = Record<string, unknown>> =
  (args: ApiAuthFunctionArgs<T>) => ReturnType<ApiFunction<T>>;