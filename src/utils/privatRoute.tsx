import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface PrivatRouteProps {
  children: React.ReactNode;
}

const PrivatRoute = async ({ children }: PrivatRouteProps) => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId');

  if (!sessionId || !sessionId.value) {
    redirect('/login');
  }
  return <>{children}</>;
};

export default PrivatRoute;
