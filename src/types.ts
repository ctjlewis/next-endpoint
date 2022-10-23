import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface NextApiError {
  error: string;
}

export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;

export type NextServerRequest = 
  NextApiRequest | Pick<GetServerSidePropsContext, "query" | "req">;
export type NextServerResponse<ResType> = 
  NextApiResponse<ResType> | Pick<GetServerSidePropsContext, "res">;