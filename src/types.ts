import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { ServerResponse } from "http";

export interface NextApiError {
  error: string;
}

// export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;
export type NextEndpointHandler<ResType> = (
  req: NextApiRequest, 
  res: NextApiResponse<ResType>,
) => ServerResponse | Promise<ServerResponse>;

export type NextServerRequest = 
  NextApiRequest | GetServerSidePropsContext["req"];

export type NextServerResponse<ResType> = 
  NextApiResponse<ResType> | GetServerSidePropsContext["res"] | NextApiError;

export type NextServerQuery = 
  NextApiRequest["query"] | GetServerSidePropsContext["query"];