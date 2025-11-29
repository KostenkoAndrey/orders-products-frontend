import React from 'react';
import UseActiveUsers from '@/hooks/useActiveUsers';

const ActiveUsers = () => {
  const { count, isConnected } = UseActiveUsers();

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-semibold text-gray-500'>Active Users:</span>
      <span className='text-sm font-bold text-gray-700'>{count}</span>
      <span className='text-sm font-bold text-gray-700'>{isConnected ? 'Connected' : 'Disconnected'}</span>
      <span className={`rounded-full w-2 h-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
    </div>
  );
};

export default ActiveUsers;
