import { apiClient } from "../client";
import { AuctionUrls } from "./url";

export interface GetAuctionsParams {
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface Auction {
  id?: string;
  title?: string;
  currentBid?: number;
  startingPrice?: number;
  year?: string;
  mileage?: string;
  images?: string[];
  endTime?: string;
  startTime?: string;
  isActive?: boolean;
  [key: string]: any;
}

export interface AuctionsResponse {
  message?: string;
  data?: {
    results?: Auction[];
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
  };
}

export const getAuctions = async (params: GetAuctionsParams): Promise<AuctionsResponse> => {
  const response = await apiClient.get<AuctionsResponse>(AuctionUrls.GET_AUCTIONS, {
    params,
  });
  return response.data;
};

export const getMyBids = async (params: Partial<GetAuctionsParams> = {}): Promise<AuctionsResponse> => {
  const response = await apiClient.get<AuctionsResponse>(AuctionUrls.GET_MY_BIDS, {
    params,
  });
  return response.data;
};
