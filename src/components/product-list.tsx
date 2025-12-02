import React from 'react';
import ProductItem from '@/components/product-item';
import { Product } from '@/api/api-product';

export interface ProductListProps {
  products: Product[];
  isActive?: boolean;
}

const ProductList = ({ products, isActive }: ProductListProps) => {
  return (
    <ul
      className={`flex flex-col w-full overflow-hidden rounded-[4px] ${!isActive && 'gap-2'}`}
    >
      {products.map((product) => (
        <ProductItem key={product._id} product={product} isActive={isActive} />
      ))}
    </ul>
  );
};

export default ProductList;
