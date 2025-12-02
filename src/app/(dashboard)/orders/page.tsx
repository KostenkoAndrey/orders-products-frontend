import React from 'react';
import { getOrders, Order as OrderItems } from '@/api/api-order';
import Order from '@/components/order';

export default async function Page() {
  let orders: OrderItems[] = [];

  try {
    const { data } = await getOrders();
    orders = data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
  }

  return <Order orders={orders} />;
}
