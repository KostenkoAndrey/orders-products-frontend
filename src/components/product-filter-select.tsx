import React from 'react';

interface Option {
  value: string;
  label: string;
}

export interface ProductFilterSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  setInternalValue: (value: string) => void;
  internalValue: string;
}

const ProductFilterSelect = ({
  label,
  options,
  value: controlledValue,
  onChange,
  disabled = false,
  className = '',
  setInternalValue,
  internalValue,
}: ProductFilterSelectProps) => {
  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setInternalValue(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <span className='text-gray-600'>{label}</span>
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`border border-gray-300 rounded px-2 text-gray-800 py-2 min-w-[300px] outline-none ${className}`}
      >
        <option value=''>Оберіть тип</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilterSelect;
