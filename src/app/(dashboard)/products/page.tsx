import React from 'react';
import { getProduct, Product as productItem } from '@/api/api-product';
import Product from '@/components/product';

export default async function Page() {
  let products: productItem[] = [];

  try {
    const { data } = await getProduct();
    products = data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
  }
  return <Product products={products} />;
}
