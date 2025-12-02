'use client';
import React, { useCallback, useMemo, useState } from 'react';

import { Order as OrderItems } from '@/api/api-order';
import PageHeader from '@/components/page-header';
import IconButton from '@/components/icon-button';
import SvgIcon from '@/components/svg-icon';
import ProductList from '@/components/product-list';
import OrderList from '@/components/order-list';
import ProductHeader from '@/components/product-header';

export interface OrderProps {
  orders: OrderItems[];
}

const Order = ({ orders }: OrderProps) => {
  const [OrderId, setOrderId] = useState<string | null>(null);

  const handleOrderClick = useCallback((id: string) => {
    setOrderId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setOrderId(null);
  }, []);

  const selectedOrder = useMemo(
    () => orders.find((order) => order._id === OrderId),
    [orders, OrderId],
  );

  const isActive = OrderId !== null;
  const order = orders.find((order) => order._id === OrderId);

  return (
    <div className='mt-18 p-10 pr-5'>
      <PageHeader>{'Order / 25'}</PageHeader>

      <div className='flex gap-5 h-screen'>
        <OrderList
          orders={orders}
          isActive={isActive}
          OrderId={OrderId}
          onClick={handleOrderClick}
        />

        <div
          className={`relative transition-transform duration-700 ease-in-out bg-inherit rounded-[4px]
        ${isActive ? 'flex-[0.57] opacity-100' : 'flex-[0] opacity-0 w-0'}`}
        >
          <ProductHeader orderName={order?.title}></ProductHeader>
          <IconButton
            onClick={handleClose}
            className={
              'absolute top-0 right-0 -translate-y-1/2 translate-x-1/2  shadow-lg  bg-gray-50 hover:scale-110' +
              'z-10 w-8 h-8 rounded-full'
            }
          >
            <SvgIcon name={'exit'} className={'w-2 h-2 fill-gray-400'} />
          </IconButton>

          {selectedOrder?.products && (
            <ProductList products={selectedOrder.products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
