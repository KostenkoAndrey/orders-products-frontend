import { useState } from 'react';

interface LoadingState {
  auth: boolean;
  google: boolean;
}

const useAuthLoading = () => {
  const [loading, setLoading] = useState<LoadingState>({
    auth: false,
    google: false,
  });

  const setAuthLoading = (value: boolean) => {
    setLoading((prev) => ({ ...prev, auth: value }));
  };

  const setGoogleLoading = (value: boolean) => {
    setLoading((prev) => ({ ...prev, google: value }));
  };

  const isAnyLoading = loading.auth || loading.google;

  return {
    loading,
    setAuthLoading,
    setGoogleLoading,
    isAnyLoading,
  };
};

export default useAuthLoading;
