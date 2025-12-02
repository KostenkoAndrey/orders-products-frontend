import { Product } from '@/api/api-product';
import { apiServer } from '@/api/api-server';

export interface Order {
  _id: string;
  title: string;
  date: string;
  description: string;
  userId: string;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  status: number;
  message: string;
  data: Order[];
}

interface OrderResponse {
  status: number;
  message: string;
  data: Order;
}

export const getOrders = () => apiServer.get<OrdersResponse>('orders');
export const getOrderById = (orderId: string) =>
  apiServer.get<OrderResponse>('orders', orderId);
export const createOrder = (credentials: Order) =>
  apiServer.post<OrderResponse>(credentials, 'orders');
export const deleteOrder = (orderId: string) =>
  apiServer.delete<void>('orders', orderId);
