import React from 'react';
import { Product as productItem } from '@/api/api-product';
import ProductList from '@/components/product-list';
import PageHeader from '@/components/page-header';

export interface ProductProps {
  products: productItem[];
}

const Product = ({ products }: ProductProps) => {
  return (
    <div className='mt-18 p-10 pr-5 h-screen'>
      <PageHeader>Products / 25</PageHeader>
      <ProductList products={products} />
    </div>
  );
};

export default Product;
