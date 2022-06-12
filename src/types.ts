import { NextApiHandler } from "next";

export interface NextApiError {
  error: unknown;
}

export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;