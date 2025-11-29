import { api } from '@/api/api';

interface Price {
  value: number;
  symbol: 'USD' | 'UAH';
  isDefault: boolean;
}

export interface Product {
  _id: string;
  serialNumber: number;
  isNew: boolean;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  date: string;
  photo?: string;
  orderId: string;
}

interface productsResponse {
  status: number;
  message: string;
  data: {
    products: Product[];
  };
}

interface productResponse {
  status: number;
  message: string;
  data: {
    product: Product;
  };
}

export const getProduct = () => api.get<productsResponse>('products');
export const getProductById = (productId: string) => api.get<productResponse>('products', productId);
export const createProduct = (credentials: Product) => api.post<productResponse>(credentials, 'products');
export const deleteProduct = (productId: string) => api.delete<void>('products', productId);
