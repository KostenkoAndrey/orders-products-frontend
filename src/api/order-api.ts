import { api } from '@/api/api';
import { Product } from '@/api/product-api';

interface Order {
  _id: string;
  title: string;
  date: string;
  description: string;
  userId: string;
  products?: Product[];
}

interface ordersResponse {
  status: number;
  message: string;
  data: {
    orders: Order[];
  };
}

interface orderResponse {
  status: number;
  message: string;
  data: {
    order: Order;
  };
}

export const getOrders = () => api.get<ordersResponse>('orders');
export const getOrderById = (orderId: string) => api.get<orderResponse>('orders', orderId);
export const createOrder = (credentials: Order) => api.post<orderResponse>(credentials, 'orders');
export const deleteOrder = (orderId: string) => api.delete<void>('orders', orderId);
