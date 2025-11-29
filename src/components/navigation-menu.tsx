'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import NavigationMenuItem from '@/components/navigation-menu-item';
import { navItems } from '@/constants';
import AuthButton from '@/components/auth-button';
import { logoutUser } from '@/api/auth-api';
import SvgIcon from '@/components/svg-icon';

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleExitClick = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <aside className='fixed top-14 left-0 z-10 w-60 bg-[#FAFAFA] shadow-[2px_0_8px_rgba(0,0,0,0.08)] h-screen'>
      <div className='flex flex-col gap-10 py-10 px-5'>
        <div className='relative'>
          <div className='mx-auto rounded-full w-[200px] h-[200px] overflow-hidden'>
            <Image className='w-[200px] h-[200px]' width={780} height={520} src='/pictures/cat.jpg' alt='logo' />
          </div>
          <div
            className='absolute bottom-7 right-7 translate-1/2 flex justify-center items-center w-[50px] h-[50px] bg-white
            rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.18)]'
          >
            <SvgIcon name={'settings'} className={'fill-text-gray-700 stroke-white w-6 h-6'} />
          </div>
        </div>
        <ul className='m-auto flex flex-col items-center gap-6'>
          {navItems.map((item, i) => (
            <NavigationMenuItem key={i} current={pathname === item.href} pathname={item.href}>
              {item.label}
            </NavigationMenuItem>
          ))}
        </ul>
        <AuthButton className='text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-white' onClick={handleExitClick}>
          Logout
        </AuthButton>
      </div>
    </aside>
  );
}
