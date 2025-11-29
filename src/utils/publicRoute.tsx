import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = async ({ children }: PublicRouteProps) => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId');

  if (sessionId && sessionId.value) {
    redirect('/');
  }
  return <>{children}</>;
};

export default PublicRoute;
