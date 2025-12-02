'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { logoutUser } from '@/api/api-auth';
import { navItems } from '@/constants';
import NavigationMenuItem from '@/components/navigation-menu-item';
import AuthButton from '@/components/auth-button';
import SvgIcon from '@/components/svg-icon';
import IconButton from '@/components/icon-button';

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleExitClick = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <aside className='fixed top-18 left-0 z-10 w-50 bg-[#FAFAFA] shadow-[2px_0_8px_rgba(0,0,0,0.08)] h-screen'>
      <div className='flex flex-col gap-10 py-12 pl-3 pr-7'>
        <div className='relative'>
          <div className='mx-auto rounded-full w-[95px] h-[95px] overflow-hidden'>
            <Image
              className='w-full h-full object-cover'
              width={780}
              height={520}
              src='/pictures/cat.jpg'
              alt='logo'
              priority
            />
          </div>
          <IconButton
            onClick={() => router.push('/settings')}
            className='absolute -bottom-1 right-6  w-10 h-10 bg-white
            rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.18)]'
          >
            <SvgIcon
              name={'settings'}
              className={'fill-text-gray-700 stroke-white w-6 h-6'}
            />
          </IconButton>
        </div>
        <ul className='m-auto flex flex-col items-center gap-6'>
          {navItems.map((item, i) => (
            <NavigationMenuItem
              key={i}
              current={pathname === item.href}
              pathname={item.href}
            >
              {item.label}
            </NavigationMenuItem>
          ))}
        </ul>
        <AuthButton
          className='text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-white'
          onClick={handleExitClick}
        >
          Logout
        </AuthButton>
      </div>
    </aside>
  );
}
