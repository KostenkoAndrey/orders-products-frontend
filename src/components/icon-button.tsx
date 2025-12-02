import React from 'react';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const IconButton = ({ children, className = '', ...rest }: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={`flex justify-center items-center cursor-pointer transition-transform 
         duration-700 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
