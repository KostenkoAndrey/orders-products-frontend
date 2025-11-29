import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SidebarItemProps {
  current?: boolean;
  pathname: string;
  children: React.ReactNode;
}

export default function NavigationMenuItem({ current, pathname, children }: SidebarItemProps) {
  return (
    <li>
      <Link href={pathname} className='relative'>
        <span className='text-sm font-semibold text-gray-700 uppercase'>{children}</span>
        {current && (
          <span
            className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-[calc(100%+10px)] h-0.75
              bg-green-500 rounded-full'
          ></span>
        )}
      </Link>
    </li>
  );
}
