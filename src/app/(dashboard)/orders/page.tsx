import React from 'react';
import { getOrders } from '@/api/api-order';
import Order from '@/components/order';

export default async function Page() {
  const { data } = await getOrders();

  return <Order orders={data} />;
}
