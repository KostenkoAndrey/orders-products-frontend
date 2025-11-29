'use client';

import React from 'react';
import SvgIcon from '@/components/svg-icon';
import LiveDateTime from '@/components/live-date-time';
import ActiveUsers from '@/components/active-users';

const TopMenu = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='ml-60 max-w-[1280px] py-1 px-5 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <SvgIcon name={'shield'} className={'w-[48px] h-[48px] fill-green-600 stroke-white'} />
          <span className='font-bold text-lg text-green-600 tracking-wide'>INVENTORY</span>
        </div>
        <div className='flex items-center gap-5'>
          <ActiveUsers />
          <LiveDateTime />
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
