import React, { useState } from 'react';
import IconButton from '@/components/icon-button';
import SvgIcon from '@/components/svg-icon';
import Modal from '@/components/modal';
import ModalAddProduct from '@/components/modal-add-product';

export interface ProductHeaderProps {
  orderName?: string;
  orderId?: string;
}

const ProductHeader = ({ orderName, orderId }: ProductHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className='px-10 py-2 bg-gray-100 rounded-[4px]'>
        <h2 className='mb-3 text-gray-700 capitalize'>{orderName}</h2>
        <div className='flex items-center gap-2 text-lime-500'>
          <IconButton
            onClick={() => setIsModalOpen(true)}
            className='w-5 h-5 rounded-full overflow-hidden bg-lime-500 hover:scale-105 shadow-sm'
          >
            <SvgIcon
              name={'plus'}
              className={'w-3 h-3 stroke-white rounded-full'}
            />
          </IconButton>
          <span>Add product</span>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalAddProduct
          onModalClose={() => setIsModalOpen(false)}
          orderId={orderId}
        />
      </Modal>
    </>
  );
};

export default ProductHeader;
