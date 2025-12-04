'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

export interface LogoUploaderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value'
  > {
  square?: boolean;
  onChange?: (file: File | undefined) => void;
  value?: File;
}

export default function LogoUploader({
  square,
  placeholder,
  id,
  onChange,
  ...rest
}: LogoUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      onChange?.(file);
    }
  };

  return (
    <div className='flex justify-center'>
      <label
        htmlFor={id}
        className={`relative flex flex-col items-center justify-center h-40 bg-white border border-slate-900 
          border-dashed cursor-pointer overflow-hidden
          ${square ? 'w-full' : 'w-40 rounded-full'}`}
      >
        {preview ? (
          <Image
            src={preview}
            alt='Preview'
            width={160}
            height={160}
            className='w-full h-full object-cover'
          />
        ) : (
          <>
            <Image
              className='mb-1'
              width={48}
              height={48}
              src='/svg/upload.svg'
              alt='upload'
            />
            {placeholder && (
              <p className='text-base text-gray-500'>{placeholder}</p>
            )}
          </>
        )}

        <input
          {...(rest as Omit<typeof rest, 'value'>)}
          ref={inputRef}
          id={id}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
        />
      </label>
    </div>
  );
}
