'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmOauth } from '@/api/api-auth';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const code = searchParams.get('code');

      if (!code) {
        router.push('/login?error=no_code');
        return;
      }

      try {
        await confirmOauth({ code });
        router.push('/');
      } catch (err) {
        console.error('Failed to authenticate:', err);
        router.push('/login?error=auth_failed');
      }
    })();
  }, [searchParams, router]);

  return null;
};

export default Page;
