'use client';

import { toastError, toastSuccess } from '@/libs/toast';
import { useEffect, useState } from 'react';
import rf from '@/services/RequestFactory';

export const useRaidenXCallback = ({ callback }: any) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const responseParams = new URLSearchParams(window.location.search);

    const code = responseParams.get('code') || '';
    setCode(code);
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }

    const connectToRaidenX = async () => {
      setIsLoading(true);
      try {
        await rf.getRequest('AuthRequest').connectToRaidenX(code);

        toastSuccess('Connect to RaidenX successfully!');
      } catch (err) {
        toastError('Failed to connect to RaidenX');
        console.error(err);
      } finally {
        setIsLoading(false);
        callback();
      }
    };

    connectToRaidenX();
  }, [code]);

  return {
    isLoading,
  };
};
