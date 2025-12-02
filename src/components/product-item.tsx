'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Product } from '@/api/api-product';
import { deleteProductAction } from '@/app/actions/product-actions';
import SvgIcon from '@/components/svg-icon';
import IconButton from '@/components/icon-button';
import ModalDelete from '@/components/modal-delete';

export interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await deleteProductAction(product._id);

      if (!result.success) {
        alert(result.error || 'Не удалось удалить продукт');
      } else {
        setIsModalOpen(false);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className='flex items-center justify-between gap-10 px-11 py-0.5 border border-gray-200 bg-gray-100 hover:shadow-lg'>
        <div className='flex items-center gap-9'>
          <span
            className={`rounded-full w-2.5 h-2.5 ${product.isNew ? 'bg-green-500' : 'bg-gray-500'} `}
          />

          <div className='relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
            <Image
              src={product.photo || '/pictures/cat.jpg'}
              alt={product.title}
              fill
              sizes='32px'
              className='object-cover'
            />
          </div>

          <div>
            <div className='text-gray-600'>{product.title}</div>
            <div className='text-gray-500'>{product.serialNumber}</div>
          </div>
        </div>
        <span className='text-[#9ACD32]'>
          {product.isNew ? 'free' : 'Under repair'}
        </span>
        <IconButton
          onClick={handleDeleteClick}
          className={`p-2 hover:bg-[#E8E8E8] rounded ${isPending && 'cursor-not-allowed opacity-50'}`}
        >
          <SvgIcon
            name={'trash'}
            className={'w-6 h-6 stroke-gray-600 fill-none'}
          />
        </IconButton>
      </li>
      <ModalDelete
        isOpen={isModalOpen}
        title={'Are you sure you want to delete this product?'}
        productTitle={product.title}
        serialNumber={product.serialNumber}
        photo={product.photo || '/pictures/cat.jpg'}
        isNew={product.isNew}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        isPending={isPending}
      />
    </>
  );
};

export default ProductItem;
