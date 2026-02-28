import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://127.0.0.1:5050";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    console.log("AXIOS - token from localStorage:", token ? "exists" : "null");
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("auth_token")?.value || null;
    console.log("AXIOS - token from cookies:", token ? "exists" : "null");
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;