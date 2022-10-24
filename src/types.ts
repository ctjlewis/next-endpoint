import { GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface NextApiError {
  error: string;
}

export type NextEndpointHandler<ResType> = NextApiHandler<ResType | NextApiError>;
// export type NextEndpointHandlerReplacement<ResType> =
//   (req: NextServerRequest, res: NextServerResponse<ResType>) => void | Promise<void>;

export type NextServerRequest = 
  NextApiRequest | GetServerSidePropsContext;
export type NextServerResponse<ResType> = 
  NextApiResponse<ResType> | GetServerSidePropsContext;