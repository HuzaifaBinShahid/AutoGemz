import { useQuery } from "@tanstack/react-query";
import { getAuctions, GetAuctionsParams, AuctionsResponse } from "./index";

export const useAuctions = (params: GetAuctionsParams) => {
  return useQuery<AuctionsResponse, Error>({
    queryKey: ["auctions", params],
    queryFn: () => getAuctions(params),
  });
};
