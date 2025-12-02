'use client';

import React, { useEffect, useState } from 'react';
import SvgIcon from '@/components/svg-icon';
import { formateDate } from '@/utils/formateDate';
import formatTime from '@/utils/formatTime';

const LiveDateTime = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='flex flex-col items-start'>
      <span className='text-sm font-semibold text-gray-700'>Today</span>
      <div className='flex items-center gap-3 text-sm font-semibold text-gray-700'>
        {currentTime ? (
          <>
            {formateDate(currentTime)}
            <div className='flex items-center gap-1'>
              <SvgIcon name={'clock'} className={'fill-green-600 w-4 h-4'} />
              {formatTime(currentTime)}
            </div>
          </>
        ) : (
          <>
            <span>--</span>
            <div className='flex items-center gap-1'>
              <SvgIcon name={'clock'} className={'fill-green-600 w-4 h-4'} />
              <div>--:--:--</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveDateTime;
