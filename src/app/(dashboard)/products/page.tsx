import React from 'react';
import { getProducts } from '@/api/api-product';
import Product from '@/components/product';

export default async function Page() {
  const { data } = await getProducts();

  return <Product products={data} />;
}
