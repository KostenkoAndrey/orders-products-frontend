import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';

import InputText from '@/components/input-text';
import LogoUploader from '@/components/logo-uploader';
import { addProductAction } from '@/app/actions/product-actions';
import { buildProductFormData, ProductFormData } from '@/utils/productForm';

export interface ModalAddProductProps {
  onModalClose: () => void;
  orderId: string | undefined;
}

const ModalAddProduct = ({ onModalClose, orderId }: ModalAddProductProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      serialNumber: undefined,
      isNew: true,
      title: '',
      type: '',
      specification: '',
      guaranteeStart: '',
      guaranteeEnd: '',
      priceUSD: undefined,
      priceUAH: undefined,
      defaultCurrency: 'USD',
    },
  });

  const handleFormSubmit = (data: ProductFormData) => {
    setError(null);

    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    startTransition(async () => {
      const formData = buildProductFormData(data, orderId);

      const result = await addProductAction(formData);

      if (!result.success) {
        setError(result.error || 'Failed to add product');
      } else {
        reset();
        onModalClose();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-8 bg-white p-8 w-[700px] rounded-xl max-h-[90vh] overflow-y-auto'
    >
      <h3 className='text-2xl font-semibold text-gray-500'>Add new product</h3>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
          {error}
        </div>
      )}

      <div className='flex gap-6'>
        <div className='flex flex-col flex-1 gap-2'>
          <Controller
            name='photo'
            control={control}
            render={({ field: { onChange } }) => (
              <LogoUploader placeholder='Upload photo' onChange={onChange} />
            )}
          />

          <InputText
            label='Serial Number'
            isRequired
            type='number'
            className='bg-white border-gray-200 text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            placeholder='Serial number'
            register={register('serialNumber', {
              required: 'Serial number is required',
              min: { value: 1, message: 'Must be greater than 0' },
              valueAsNumber: true,
            })}
            error={errors.serialNumber?.message}
          />

          <InputText
            label='Title'
            isRequired
            type='text'
            className='bg-white border-gray-200 text-black'
            placeholder='Product title'
            register={register('title', {
              required: 'Title is required',
              minLength: { value: 1, message: 'Min 1 character' },
              maxLength: { value: 30, message: 'Max 30 characters' },
            })}
            error={errors.title?.message}
          />

          <InputText
            label='Type'
            isRequired
            type='text'
            className='bg-white border-gray-200 text-black'
            placeholder='Product type'
            register={register('type', {
              required: 'Type is required',
              minLength: { value: 1, message: 'Min 1 character' },
              maxLength: { value: 30, message: 'Max 30 characters' },
            })}
            error={errors.type?.message}
          />
          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              id='isNew'
              {...register('isNew')}
              className='w-5 h-5 rounded accent-green-500 cursor-pointer'
            />
            <label
              htmlFor='isNew'
              className='text-gray-700 font-medium cursor-pointer'
            >
              Is New Product
            </label>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-2'>
          <InputText
            label='Specification'
            isRequired
            type='text'
            className='bg-white border-gray-200 text-black'
            placeholder='Specification'
            register={register('specification', {
              required: 'Specification is required',
              minLength: { value: 1, message: 'Min 1 character' },
              maxLength: { value: 30, message: 'Max 30 characters' },
            })}
            error={errors.specification?.message}
          />

          <InputText
            label='Guarantee Start'
            isRequired
            type='date'
            className='bg-white border-gray-200 text-black [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            min='2000-01-01'
            max='2099-12-31'
            register={register('guaranteeStart', {
              required: 'Guarantee start date is required',
            })}
            error={errors.guaranteeStart?.message}
          />

          <InputText
            label='Guarantee End'
            isRequired
            type='date'
            className='bg-white border-gray-200 text-black [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            min='2000-01-01'
            max='2099-12-31'
            register={register('guaranteeEnd', {
              required: 'Guarantee end date is required',
            })}
            error={errors.guaranteeEnd?.message}
          />

          <InputText
            label='Price USD'
            isRequired
            type='number'
            className='bg-white border-gray-200 text-black'
            placeholder='0.00'
            step='0.01'
            register={register('priceUSD', {
              required: 'USD price is required',
              min: { value: 0, message: 'Must be positive or zero' },
              valueAsNumber: true,
            })}
            error={errors.priceUSD?.message}
          />

          <InputText
            label='Price UAH'
            isRequired
            type='number'
            className='bg-white border-gray-200 text-black'
            placeholder='0.00'
            step='0.01'
            register={register('priceUAH', {
              required: 'UAH price is required',
              min: { value: 0, message: 'Must be positive or zero' },
              valueAsNumber: true,
            })}
            error={errors.priceUAH?.message}
          />

          <div className='flex flex-col gap-2'>
            <label className='text-gray-700 font-medium text-sm'>
              Default Currency
            </label>
            <select
              {...register('defaultCurrency', {
                required: 'Default currency is required',
              })}
              className='px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-black outline-none'
            >
              <option value='USD'>USD</option>
              <option value='UAH'>UAH</option>
            </select>
            {errors.defaultCurrency && (
              <p className='text-red-500 text-xs'>
                {errors.defaultCurrency.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-[#4ade80] text-white px-6 py-3 rounded-xl hover:bg-[#22c55e] disabled:opacity-50
        disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md cursor-pointer'
      >
        {isPending ? 'Adding...' : 'Add product'}
      </button>
    </form>
  );
};

export default ModalAddProduct;
