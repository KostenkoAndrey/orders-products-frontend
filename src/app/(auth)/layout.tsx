import React from 'react';

import PublicRoute from '@/components/public-route';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <PublicRoute>
      <div className='flex justify-center items-center h-screen bg-[#121212]'>{children}</div>
    </PublicRoute>
  );
};

export default Layout;
