export interface PaginationParams {
  limit?: number;
  skip?: number;
  select?: string;
}

export interface GetProductsRequest extends PaginationParams {}

export interface ProductRecord {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
}

export interface GetProductsResponse {
  products: ProductRecord[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductRequest {
  id: string;
}

export interface GetProductResponse extends ProductRecord {}
