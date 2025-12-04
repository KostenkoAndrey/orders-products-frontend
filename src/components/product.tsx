'use client';

import React from 'react';
import { Product as productItem } from '@/api/api-product';
import ProductList from '@/components/product-list';
import PageHeader from '@/components/page-header';
import { usePathname } from 'next/navigation';

export interface ProductProps {
  products: productItem[];
}

const Product = ({ products }: ProductProps) => {
  const path = usePathname();
  return (
    <div className='mt-18 p-10 pr-5 h-screen'>
      <PageHeader isProductPage={path === '/products'}>
        Products / 25
      </PageHeader>
      <ProductList products={products} />
    </div>
  );
};

export default Product;
