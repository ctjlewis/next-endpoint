import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { ServerResponse } from "http";

export interface NextApiError {
  error: string;
}

// export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;
export type NextEndpointHandler<ResType> = (
  req: NextServerRequest, 
  res: NextServerResponse<ResType>,
  query?: GetServerSidePropsContext["query"]
) => ServerResponse | Promise<ServerResponse>;

export type NextServerRequest = 
  NextApiRequest | GetServerSidePropsContext["req"];

export type NextServerResponse<ResType> = 
  NextApiResponse<ResType> | GetServerSidePropsContext["res"];