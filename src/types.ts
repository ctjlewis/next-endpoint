import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface NextApiError {
  error: string;
}

export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;

export type NextServerRequest = NextApiRequest | GetServerSidePropsContext["req"];
export type NextServerResponse<ResType> = 
  NextApiResponse<ResType> | GetServerSidePropsContext["res"];