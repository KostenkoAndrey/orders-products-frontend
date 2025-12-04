import React from 'react';
import IconButton from '@/components/icon-button';
import SvgIcon from '@/components/svg-icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm'
      onClick={onClose}
    >
      <div className='relative' onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={onClose}
          className='z-10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors'
          aria-label='Close modal'
        >
          <SvgIcon name={'exit'} className={'h-3 w-3 fill-gray-600'} />
        </IconButton>
        {children}
      </div>
    </div>
  );
};

export default Modal;
