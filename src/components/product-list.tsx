import React from 'react';
import ProductItem from '@/components/product-item';
import { Product } from '@/api/api-product';

export interface ProductListProps {
  products: Product[];
  isActive?: boolean;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul className='w-full'>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
