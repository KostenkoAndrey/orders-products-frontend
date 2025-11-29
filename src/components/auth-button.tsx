import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string;
  disabled?: boolean;
}

const AuthButton = ({ children, disabled, className = '', ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`p-[10px] font-medium text-[14px] leading-[1.42] rounded-xl bg-[#006fee] w-full transition-all duration-300 ease-in-out 
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed active:scale-100'
            : 'cursor-pointer active:scale-[0.95] hover:bg-[#007bff]'
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
