'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Product } from '@/api/api-product';
import { deleteProductAction } from '@/app/actions/product-actions';
import SvgIcon from '@/components/svg-icon';
import IconButton from '@/components/icon-button';
import ModalDelete from '@/components/modal-delete';
import { formatShortDate } from '@/utils/formateDate';
import { log } from 'next/dist/server/typescript/utils';
import Modal from '@/components/modal';

export interface ProductItemProps {
  product: Product;
  isActive?: boolean;
}

const ProductItem = ({ product, isActive }: ProductItemProps) => {
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
      <li
        className={`grid items-center gap-6 px-11 py-3 border border-gray-300 bg-gray-100 
              hover:shadow-lg transition-all duration-300 ${
                isActive
                  ? 'grid-cols-[auto_1fr_auto_auto]'
                  : 'grid-cols-[auto_minmax(150px,1fr)_100px_140px_90px_100px_auto] rounded-[4px]'
              }`}
      >
        <span
          className={`rounded-full w-2.5 h-2.5 flex-shrink-0 ${
            product.isNew ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />

        <div className='flex items-center gap-3 min-w-0'>
          <div className='relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
            <Image
              src={product.photo || '/pictures/cat.jpg'}
              alt={product.title}
              fill
              sizes='40px'
              className='object-cover'
            />
          </div>

          <div className='min-w-0'>
            <div className='text-gray-700 font-medium truncate'>
              {product.title}
            </div>
            <div className='text-gray-500 text-xs truncate'>
              {product.serialNumber}
            </div>
          </div>
        </div>

        <span className='text-[#9ACD32] font-medium text-center whitespace-nowrap'>
          {product.isNew ? 'свободен' : 'в работе'}
        </span>

        {!isActive && (
          <>
            <div className='flex flex-col gap-0.5 text-center'>
              <div className='text-gray-500 text-xs whitespace-nowrap'>
                {formatShortDate(product.guarantee.start)}
              </div>
              <div className='text-gray-600 text-xs whitespace-nowrap'>
                {formatShortDate(product.guarantee.end)}
              </div>
            </div>
            <span className='text-gray-500 text-xs text-center whitespace-nowrap'>
              {product.isNew ? 'новый' : 'Б/У'}
            </span>
            <div className='flex flex-col gap-0.5 text-right'>
              {product.price.map((el, i) => (
                <div
                  key={i}
                  className='text-gray-400 text-xs whitespace-nowrap'
                >
                  {el.value} {el.symbol}
                </div>
              ))}
            </div>
          </>
        )}

        <IconButton
          onClick={handleDeleteClick}
          disabled={isPending}
          className={`p-2 hover:bg-[#E8E8E8] rounded transition-colors justify-self-center ${
            isPending && 'cursor-not-allowed opacity-50'
          }`}
          aria-label='Delete product'
        >
          <SvgIcon name='trash' className='w-6 h-6 stroke-gray-600 fill-none' />
        </IconButton>
      </li>
      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <ModalDelete
          title={'Are you sure you want to delete this product?'}
          productTitle={product.title}
          serialNumber={product.serialNumber}
          photo={product.photo || '/pictures/cat.jpg'}
          isNew={product.isNew}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          isPending={isPending}
        />
      </Modal>
    </>
  );
};

export default ProductItem;
