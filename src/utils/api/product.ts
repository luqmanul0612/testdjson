import type { GetProductResponse, GetProductsRequest, GetProductsResponse } from "@/types/product";
import axiosInstance from "@/lib/axios";

export const getProducts = async (params: GetProductsRequest) => {
  const response = await axiosInstance.get<GetProductsResponse>(`/products`, { params });
  return response;
};

export const getProduct = async (id: number) => {
  const response = await axiosInstance.get<GetProductResponse>(`/products/${id}`);
  return response;
};

export const postProduct = async (data: Partial<GetProductResponse>) => {
  const response = await axiosInstance.post<GetProductResponse>(`/products`, data);
  return response;
};

export const putProduct = async (id: number, data: Partial<GetProductResponse>) => {
  const response = await axiosInstance.put<GetProductResponse>(`/products/${id}`, data);
  return response;
};
