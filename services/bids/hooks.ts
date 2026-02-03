import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placeBid, getBids, PlaceBidPayload, GetBidsParams, BidsResponse } from "./index";

export const useBids = (auctionId: string, params: GetBidsParams = {}) => {
  return useQuery<BidsResponse, Error>({
    queryKey: ["bids", auctionId, params],
    queryFn: () => getBids(auctionId, params),
    enabled: !!auctionId,
  });
};

export const usePlaceBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PlaceBidPayload) => placeBid(auctionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bids", auctionId] });
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });
};
