'use client';

import { useRouter } from 'next/navigation';
import { loginUser, registerUser, AuthRequest, getOauthUrl } from '@/api/auth-api';
import useAuthLoading from '@/hooks/useAuthLoading';

type AuthMethod = 'login' | 'register';

const useAuth = (method: AuthMethod = 'login') => {
  const router = useRouter();
  const { loading, setAuthLoading, setGoogleLoading, isAnyLoading } = useAuthLoading();

  const onSubmit = async (data: AuthRequest) => {
    try {
      setAuthLoading(true);

      if (method === 'login') {
        await loginUser(data);
      } else if (method === 'register') {
        await registerUser(data);
      }

      router.push('/');
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const onGoogleSubmit = async () => {
    try {
      setGoogleLoading(true);
      const { data } = await getOauthUrl();

      if (!data?.url) {
        return null;
      }

      window.location.href = data.url;
    } catch (err) {
      throw err;
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    loading,
    isAnyLoading,
    onSubmit,
    onGoogleSubmit,
  };
};

export default useAuth;
