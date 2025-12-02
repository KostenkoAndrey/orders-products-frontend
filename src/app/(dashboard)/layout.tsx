import React from 'react';

import PrivatRoute from '@/components/privat-route';
import NavigationMenu from '@/components/navigation-menu';
import TopMenu from '@/components/top-menu';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <PrivatRoute>
      <NavigationMenu />
      <TopMenu />
      <div className='ml-50 max-w-[1280px] m-auto bg-[#E8E8E8]'>{children}</div>
    </PrivatRoute>
  );
};

export default Layout;
