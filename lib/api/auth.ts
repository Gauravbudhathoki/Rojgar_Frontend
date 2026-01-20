import axiosInstance from "./axios";
import { API } from "./endpoints";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: unknown;
  message: string;
  token?: string;
}

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(API.AUTH.LOGIN, loginData);
  return response.data;
};

export const register = async (registrationData: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(API.AUTH.REGISTER, registrationData);
  return response.data;
};