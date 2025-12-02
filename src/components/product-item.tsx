'use client';

import React, { useTransition } from 'react';
import Image from 'next/image';
import { Product } from '@/api/api-product';
import { deleteProductAction } from '@/app/actions/product-actions';
import SvgIcon from '@/components/svg-icon';
import IconButton from '@/components/icon-button';

export interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm(`Удалить продукт "${product.title}"?`)) return;

    startTransition(async () => {
      const result = await deleteProductAction(product._id);

      if (!result.success) {
        alert(result.error || 'Не удалось удалить продукт');
      }
    });
  };

  return (
    <li className='flex items-center justify-between gap-10 px-11 py-0.5 border border-gray-200 bg-gray-100 hover:shadow-lg'>
      <div className='flex items-center gap-9'>
        <span
          className={`rounded-full w-2.5 h-2.5 ${product.isNew ? 'bg-green-500' : 'bg-gray-500'} `}
        />
        <Image
          className='rounded-full overflow-hidden w-8 h-8'
          src={product.photo || '/pictures/cat.jpg'}
          alt={product.title}
          width={32}
          height={32}
        />

        <div>
          <div className='text-gray-600'>{product.title}</div>
          <div className='text-gray-500'>{product.serialNumber}</div>
        </div>
      </div>
      <span className='text-[#9ACD32]'>
        {product.isNew ? 'free' : 'Under repair'}
      </span>
      <IconButton
        onClick={handleDelete}
        disabled={isPending}
        className={`p-2 hover:bg-[#E8E8E8] rounded ${isPending && 'cursor-not-allowed opacity-50'}`}
      >
        {isPending ? (
          <span className='text-xl'>⏳</span>
        ) : (
          <SvgIcon
            name={'trash'}
            className={'w-6 h-6 stroke-gray-600 fill-none'}
          />
        )}
      </IconButton>
    </li>
  );
};

export default ProductItem;
