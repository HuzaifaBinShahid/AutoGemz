import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@auth_token";
const REFRESH_TOKEN_KEY = "@refresh_token";

export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const removeRefreshToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const clearAllTokens = async (): Promise<void> => {
  await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
};
