import { apiClient } from "../client";
import { BidUrls } from "./url";

export interface PlaceBidPayload {
  vehicleId: string;
  bidAmount: number;
}

export interface GetBidsParams {
  vehicleId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface Bid {
  id: string;
  bidderId: {
    id: string;
    fullName: string;
    email: string;
  };
  auctionId: string;
  vehicleId: string;
  bidAmount: number;
  createdAt: string;
}

export interface BidsResponse {
  message?: string;
  data?: {
    results?: Bid[];
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
  };
}

export const placeBid = async (auctionId: string, payload: PlaceBidPayload): Promise<any> => {
  const url = BidUrls.PLACE_BID.replace(":auctionId", auctionId);
  const response = await apiClient.post(url, payload);
  return response.data;
};

export const getBids = async (auctionId: string, params: GetBidsParams = {}): Promise<BidsResponse> => {
  const url = BidUrls.GET_BIDS.replace(":auctionId", auctionId);
  const response = await apiClient.get<BidsResponse>(url, { params });
  return response.data;
};
