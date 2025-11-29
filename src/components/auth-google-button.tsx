import React from 'react';
import Image from 'next/image';
import AuthButton from '@/components/auth-button';

export interface GoogleAuthButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const AuthGoogleButton = ({ disabled, label, onClick }: GoogleAuthButtonProps) => {
  return (
    <AuthButton
      type={'button'}
      onClick={onClick}
      disabled={disabled}
      className='text-black flex items-center justify-center gap-3 bg-white hover:bg-[#dbe7fd] hover:text-[#1a73e8]
    focus:ring-offset-[#18181b] active:scale-[0.95]  shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[0_3px_8px_rgba(0,0,0,0.15)]'
    >
      <Image src='/svg/googleicon.svg' alt='Google logo' width={20} height={20} />
      {label}
    </AuthButton>
  );
};

export default AuthGoogleButton;
