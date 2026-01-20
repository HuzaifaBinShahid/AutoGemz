import { apiClient } from "../client";
import { AuthUrls } from "./url";

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  username: string;
  role: string;
}

export interface RegisterResponse {
  message?: string;
  data?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  user?: {
    fullName?: string;
    gender?: string | null;
    dateOfBirth?: string | null;
    country?: string | null;
    city?: string | null;
    email?: string;
    username?: string;
    phone?: string;
    role?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    avatar?: string | null;
    isActive?: boolean;
    lastLogin?: string;
    metadata?: any;
    id?: string;
  };
  token?: {
    access?: {
      token?: string;
      expires?: string;
    };
    refresh?: {
      token?: string;
      expires?: string;
    };
  };
}

export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(AuthUrls.REGISTER, payload);
  return response.data;
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(AuthUrls.LOGIN, payload);
  return response.data;
};

export interface ProfileResponse {
  message?: string;
  data?: {
    fullName?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    email?: string;
    username?: string;
    phone?: string;
    mobileNumber?: string;
    [key: string]: any;
  };
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>(AuthUrls.PROFILE);
  return response.data;
};

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  message?: string;
}

export const logout = async (payload: LogoutRequest): Promise<LogoutResponse> => {
  const response = await apiClient.post<LogoutResponse>(AuthUrls.LOGOUT, payload);
  return response.data;
};

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
}

export const forgotPassword = async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>(AuthUrls.FORGOT_PASSWORD, payload);
  return response.data;
};
