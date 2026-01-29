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
