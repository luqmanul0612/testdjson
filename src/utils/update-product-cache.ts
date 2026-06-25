import queryClient from "@/lib/queryClient";
import type { GetProductsResponse, ProductRecord } from "@/types/product";
import type { AxiosResponse } from "axios";

export const addProductToCache = (data: ProductRecord, params: any) => {
  queryClient.setQueryData(["products", params], (oldData: AxiosResponse<GetProductsResponse> | undefined) => {
    if (!oldData) return oldData;
    const newProduct: ProductRecord = {
      ...data,
      sku: "SKU-TEST-123",
      stock: 100,
      rating: 4.5,
    };
    return {
      ...oldData,
      data: {
        ...oldData.data,
        products: [newProduct, ...oldData.data.products],
        total: oldData.data.total + 1,
      },
    };
  });
};

export const updateProductInCache = (data: ProductRecord, params: any) => {
  queryClient.setQueryData(["products", params], (oldData: AxiosResponse<GetProductsResponse> | undefined) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      data: {
        ...oldData.data,
        products: oldData.data.products.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
      },
    };
  });
};

export const deleteProductFromCache = (id: number, params: any) => {
  queryClient.setQueryData(["products", params], (oldData: AxiosResponse<GetProductsResponse> | undefined) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      data: {
        ...oldData.data,
        products: oldData.data.products.filter((item) => item.id !== id),
        total: oldData.data.total - 1,
      },
    };
  });
};
