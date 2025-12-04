import { apiServer } from '@/api/api-server';

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
  data: Product[];
}

interface productResponse {
  status: number;
  message: string;
  data: {
    product: Product;
  };
}
export type addProduct = Omit<Product, '_id'>;

export const getProducts = () => apiServer.get<productsResponse>('products');

export const getProductById = (productId: string) =>
  apiServer.get<productResponse>('products', productId);

export const createProduct = (credentials: addProduct) =>
  apiServer.post<productResponse>(credentials, 'products');

export const createProductWithFile = (formData: FormData) =>
  apiServer.postFormData<productResponse>(formData, 'products');

export const deleteProduct = (productId: string) =>
  apiServer.delete<void>('products', productId);
