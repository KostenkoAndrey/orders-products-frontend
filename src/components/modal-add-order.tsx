import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import InputText from '@/components/input-text';
import { addOrderAction } from '@/app/actions/order-actions';

export interface ModalAddOrderProps {
  onModalClose: () => void;
}

interface OrderFormData {
  title: string;
  date: string;
  description: string;
}

const ModalAddOrder = ({ onModalClose }: ModalAddOrderProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    defaultValues: {
      title: '',
      date: '',
      description: '',
    },
  });

  const handleFormSubmit = (data: OrderFormData) => {
    setError(null);

    startTransition(async () => {
      const result = await addOrderAction(data);

      if (!result.success) {
        setError(result.error || 'Не удалось создать заказ');
      } else {
        reset();
        onModalClose();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-8 bg-white p-8 w-[600px] rounded-xl'
    >
      <h3 className='text-2xl font-semibold text-gray-500'>Add new order</h3>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
          {error}
        </div>
      )}

      <div className='flex flex-col gap-5'>
        <InputText
          label='Title'
          isRequired
          type='text'
          className='bg-white border-gray-200 text-black'
          placeholder='Order title'
          register={register('title', {
            required: 'Title is required',
            minLength: {
              value: 1,
              message: 'Description must be at least 3 characters',
            },
          })}
          error={errors.title?.message}
        />

        <InputText
          label='Date'
          isRequired
          type='date'
          className='bg-white border-gray-200 text-black [&::-webkit-calendar-picker-indicator]:opacity-0'
          min='1900-01-01'
          max='2099-12-31'
          register={register('date', {
            required: 'Date is required',
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Date must be in YYYY-MM-DD format',
            },
          })}
          error={errors.date?.message}
        />

        <InputText
          label='Description'
          isRequired
          type='text'
          className='bg-white border-gray-200 text-black'
          placeholder='Order description'
          register={register('description', {
            required: 'Description is required',
            minLength: {
              value: 3,
              message: 'Description must be at least 3 characters',
            },
          })}
          error={errors.description?.message}
        />
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-[#4ade80] text-white px-6 py-3 rounded-xl hover:bg-[#22c55e] disabled:opacity-50
        disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md cursor-pointer'
      >
        {isPending ? 'Adding...' : 'Add order'}
      </button>
    </form>
  );
};

export default ModalAddOrder;
