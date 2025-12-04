'use client';

import React from 'react';
import IconButton from '@/components/icon-button';
import SvgIcon from '@/components/svg-icon';

export interface PageHeaderProps {
  children: React.ReactNode;
  onModalOpen?: () => void;
  isProductPage?: boolean;
}

const PageHeader = ({
  children,
  onModalOpen,
  isProductPage,
}: PageHeaderProps) => {
  return (
    <>
      <div className='flex items-center gap-5 mb-10'>
        {!isProductPage && (
          <IconButton
            onClick={onModalOpen}
            className='w-9 h-9 p-1 rounded-full overflow-hidden bg-lime-600 hover:scale-105 shadow-sm'
          >
            <SvgIcon
              name={'plus'}
              className={'p-2 w-7 h-7 stroke-white rounded-full bg-lime-500'}
            />
          </IconButton>
        )}
        <h2 className='text-gray-600 text-[24px]'>{children}</h2>
      </div>
    </>
  );
};

export default PageHeader;
