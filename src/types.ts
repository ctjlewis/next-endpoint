import { NextApiHandler } from "next";

export interface NextApiError {
  error: string;
}

export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;