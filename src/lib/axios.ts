import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { router } from "./router";
import { useAuthStore } from "@/stores/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      useAuthStore.getState().clearAuth();
      if (router.state.location.pathname !== "/login") {
        window.location.href = `/login?message=${encodeURIComponent(error?.response?.data?.message || "Unauthorized")}`;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
