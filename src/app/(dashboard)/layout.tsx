import React from 'react';

import PrivatRoute from '@/utils/privatRoute';
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
      <div className='ml-60 max-w-[1280px] w-full m-auto bg-[#E8E8E8]'>{children}</div>
    </PrivatRoute>
  );
};

export default Layout;
