import { useQuery } from "@tanstack/react-query";
import { getAuctions, GetAuctionsParams, AuctionsResponse, getMyBids } from "./index";

export const useAuctions = (params: GetAuctionsParams) => {
  return useQuery<AuctionsResponse, Error>({
    queryKey: ["auctions", params],
    queryFn: () => getAuctions(params),
  });
};

export const useMyBids = (params: Partial<GetAuctionsParams> = {}) => {
  return useQuery<AuctionsResponse, Error>({
    queryKey: ["my-bids", params],
    queryFn: () => getMyBids(params),
  });
};
