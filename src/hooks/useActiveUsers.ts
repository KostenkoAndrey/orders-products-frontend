'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseActiveUsersProps {
  count: number;
  isConnected: boolean;
}

const useActiveUsers = (): UseActiveUsersProps => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(BASE_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('activeUsers', (data: { count: number }) => {
      setCount(data.count);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('connect_error', () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [BASE_URL]);

  return { count, isConnected };
};

export default useActiveUsers;
