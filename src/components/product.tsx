'use client';

import React, { useState } from 'react';
import { Product as productItem } from '@/api/api-product';
import ProductList from '@/components/product-list';
import PageHeader from '@/components/page-header';
import { usePathname } from 'next/navigation';
import ProductFilterSelect from '@/components/product-filter-select';
import getUniqueTypes from '@/utils/getUniqueTypes';

export interface ProductProps {
  products: productItem[];
}

const Product = ({ products }: ProductProps) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const uniqueTypes = getUniqueTypes(products);
  const path = usePathname();

  const filteredProducts = products.filter((product) =>
    product.type.includes(internalValue),
  );

  return (
    <div className='mt-18 px-10 py-10 min-h-screen'>
      <div className='flex items-baseline gap-10'>
        <PageHeader isProductPage={path === '/products'}>
          Products / 25
        </PageHeader>
        <ProductFilterSelect
          label={'Тип:'}
          options={uniqueTypes}
          setInternalValue={setInternalValue}
          internalValue={internalValue}
        />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Product;
