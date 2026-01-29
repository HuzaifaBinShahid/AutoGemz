import { apiClient } from "../client";
import { VehicleUrls } from "./url";

export interface SellVehicleRequest {
  make: string;
  model: string;
  year: number;
  transmission: string;
  vin: string;
  mileage: number;
  description: string;
  mobileNumber: string;
  allowWhatpsAppContact: boolean;
  type: string;
  secondaryNumber: string;
  city: string;
  price?: number;
  state?: string;
  freeinspectionRequest?: boolean;
}

export interface SellVehicleResponse {
  message?: string;
  data?: Record<string, unknown>;
}

export const sellVehicle = async (payload: SellVehicleRequest): Promise<SellVehicleResponse> => {
  const response = await apiClient.post<SellVehicleResponse>(VehicleUrls.SELL_VEHICLE, payload);
  return response.data;
};

export const sellVehicleWithFormData = async (formData: FormData): Promise<SellVehicleResponse> => {
  const response = await apiClient.post<SellVehicleResponse>(VehicleUrls.SELL_VEHICLE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export interface SellingVehicle {
  make: string;
  model: string;
  year: number;
  transmission: string;
  vin: string;
  mileage: number;
  description: string;
  additionalDetails: string | null;
  images: string[];
  city: string;
  state?: string;
  freeinspectionRequest: boolean;
  mobileNumber: string;
  secondaryNumber: string;
  allowWhatpsAppContact: boolean;
  userId: string;
  isActive: boolean;
  adStatus: string;
  vehicleStatus: string;
  inspectorId: string | null;
  type: string;
  price?: number;
  id: string;
}

export interface SellingVehiclesResponse {
  message?: string;
  data?: {
    results: SellingVehicle[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
}

export interface GetSellingVehiclesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
}

export const getSellingVehicles = async (
  params: GetSellingVehiclesParams = {}
): Promise<SellingVehiclesResponse> => {
  const { page = 1, limit = 10, sortBy = "createdAt:desc" } = params;
  const response = await apiClient.get<SellingVehiclesResponse>(
    VehicleUrls.SELLING_VEHICLES,
    { params: { page, limit, sortBy } }
  );
  return response.data;
};
