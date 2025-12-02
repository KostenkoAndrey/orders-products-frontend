'use client';

import React from 'react';
import { Order } from '@/api/api-order';
import OrderItem from '@/components/order-item';

export interface OrderProps {
  orders: Order[];
  isActive: boolean;
  OrderId: string | null;
  onClick: (id: string) => void;
}

const OrderList = ({ orders, isActive, OrderId, onClick }: OrderProps) => {
  return (
    <ul
      className={`flex flex-col gap-2 transition-all duration-700 ease-in-out
      ${isActive ? 'flex-[0.43]' : 'flex-1'}`}
    >
      {orders.map((el) => (
        <OrderItem
          key={el._id}
          item={el}
          isActive={isActive}
          isSelected={OrderId === el._id}
          onClick={() => onClick(el._id)}
        />
      ))}
    </ul>
  );
};

export default OrderList;
