import React from 'react';
import { Order } from '@/api/api-order';
import SvgIcon from '@/components/svg-icon';
import { formatShortDate } from '@/utils/formateDate';
import IconButton from '@/components/icon-button';
import { deleteOrderAction } from '@/app/actions/order-actions';
import { useTransition } from 'react';

export interface OrderItemProps {
  item: Order;
  isSelected: boolean;
  isActive: boolean;
  onClick: (id: string) => void;
}

const OrderItem = ({ item, onClick, isSelected, isActive }: OrderItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm(`Удалить заказ "${item.title}"?`)) return;

    startTransition(async () => {
      const result = await deleteOrderAction(item._id);

      if (!result.success) {
        alert(result.error || 'Не удалось удалить заказ');
      }
    });
  };

  return (
    <li
      className='relative flex items-center justify-between gap-5 border border-gray-300 rounded-[4px] shadow-sm py-2 px-9
    bg-gray-100 overflow-hidden'
    >
      <div
        className={`flex items-center justify-between gap-10 ${isActive && 'hidden'}`}
      >
        <span className='text-gray-600 text-base'>{item.title}</span>
      </div>

      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-5'>
          <IconButton
            onClick={() => onClick(item._id)}
            className='w-10 h-10 rounded-full bg-[#E8E8E8] overflow-hidden border
            border-gray-400 hover:bg-[#DADADA]'
          >
            <SvgIcon name={'list'} className={'w-6 h-6 stroke-gray-700'} />
          </IconButton>

          <div className='text-left '>
            <div className='text-[20px] font-semibold text-gray-600'>
              {item.products?.length}
            </div>
            <div className='text-gray-400 text-[16px]'>Products</div>
          </div>
        </div>
        <div className='text-left'>
          <div className='text-gray-500 text-[12px]'>04 / 12</div>
          <div className='text-gray-600 text-[12px]'>
            {formatShortDate(item.date)}
          </div>
        </div>

        <div className={`${isActive && 'hidden'}`}>
          <div className='text-gray-400 text-[12px]'>2 500 $</div>
          <div className='text-gray-500 text-[12px]'>250 000. 50 UAH</div>
        </div>
      </div>
      <IconButton
        onClick={handleDelete}
        className={`p-2 hover:bg-[#E8E8E8] rounded ${isActive && 'hidden'}`}
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

      <div
        className={`flex justify-center items-center absolute top-0 right-0 h-full p-2 bg-gray-300
          transition-transform duration-700 ease-in-out ${isSelected ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <SvgIcon name={'right-arrow'} className={'w-5 h-6 fill-white'} />
      </div>
    </li>
  );
};

export default OrderItem;
