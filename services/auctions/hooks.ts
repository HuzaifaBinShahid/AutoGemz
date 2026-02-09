import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuctions,
  GetAuctionsParams,
  AuctionsResponse,
  getMyBids,
  participateInAuction,
  getAuctionById,
} from "./index";

export const useAuctions = (params: GetAuctionsParams) => {
  return useQuery<AuctionsResponse, Error>({
    queryKey: ["auctions", params],
    queryFn: () => getAuctions(params),
  });
};

export const useAuction = (auctionId: string) => {
  return useQuery({
    queryKey: ["auction", auctionId],
    queryFn: () => getAuctionById(auctionId),
    enabled: !!auctionId,
  });
};

export const useMyBids = (params: Partial<GetAuctionsParams> = {}) => {
  return useQuery<AuctionsResponse, Error>({
    queryKey: ["my-bids", params],
    queryFn: () => getMyBids(params),
  });
};

export const useParticipateInAuction = (auctionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => participateInAuction(auctionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      queryClient.invalidateQueries({ queryKey: ["my-bids"] });
    },
  });
};
