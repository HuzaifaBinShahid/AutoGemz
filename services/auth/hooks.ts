import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPassword, ForgotPasswordRequest, ForgotPasswordResponse, getProfile, login, LoginRequest, LoginResponse, logout, LogoutRequest, LogoutResponse, ProfileResponse, register, RegisterRequest, RegisterResponse } from "./index";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
  });
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};

export const useLogout = () => {
  return useMutation<LogoutResponse, Error, LogoutRequest>({
    mutationFn: logout,
  });
};

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: forgotPassword,
  });
};

export const useProfile = () => {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
