import React from 'react';
import Image from 'next/image';
import IconButton from '@/components/icon-button';
import SvgIcon from '@/components/svg-icon';

export interface ModalDeleteProps {
  isOpen: boolean;
  title: string;
  productTitle: string;
  serialNumber?: number;
  photo?: string;
  isNew?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

const ModalDelete = ({
  isOpen,
  title,
  productTitle,
  serialNumber,
  isNew,
  photo,
  onConfirm,
  onCancel,
  isPending = false,
}: ModalDeleteProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 z-50 flex items-center justify-center'>
      <div className='relative rounded-[4px] w-[600px] bg-white'>
        <IconButton
          onClick={onCancel}
          className={
            'absolute top-0 right-0 -translate-y-1/2 translate-x-1/2  shadow-lg bg-gray-50 hover:scale-110 z-10 w-8 h-8 rounded-full'
          }
        >
          <SvgIcon name={'exit'} className={'w-2 h-2 fill-gray-400'} />
        </IconButton>

        <h3 className='text-gray-600 py-5 px-10'>{title}</h3>

        <div className='flex items-center gap-5 border-t border-gray-200 py-2 px-10'>
          {isNew && (
            <span
              className={`rounded-full w-2.5 h-2.5 ${isNew ? 'bg-green-500' : 'bg-gray-500'} `}
            />
          )}

          {photo && (
            <div className='relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
              <Image
                src={photo}
                alt={title}
                fill
                sizes='32px'
                className='object-cover'
              />
            </div>
          )}

          <div>
            <div className='text-gray-600'>{productTitle}</div>
            <div className='text-gray-500'>{serialNumber}</div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-2 bg-lime-500 py-5 px-10 rounded-b-[4px]'>
          <IconButton
            className='text-[16px] text-white py-2 px-4 hover:bg-white hover:text-lime-500 rounded-full'
            onClick={onCancel}
          >
            Cancel
          </IconButton>
          <IconButton
            className='group text-[16px] text-red-500 hover:text-red-700 bg-white py-2 px-4 rounded-full gap-2 hover:scale-102 shadow-lg'
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <span className='text-xl'>⏳</span>
            ) : (
              <SvgIcon
                name={'trash'}
                className='stroke-red-500 group-hover:stroke-red-700 w-4 h-4 fill-none'
              />
            )}
            Delete
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
