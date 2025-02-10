'use client';

import { useGoogleCallback } from '@/hooks/useGoogleCallback';
import { useLogin } from '@/hooks/useLogin';
import { useEffect } from 'react';
import { Storage } from '@/libs/storage';
import { toastError } from '@/libs/toast';
import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/libs/zustand/auth';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { isLoading, onLogin, setRedirectUri } = useLogin();
  const { idToken, accessToken, redirectUri } = useGoogleCallback();
  const { setAccountData } = useAuthStore();

  useEffect(() => {
    setRedirectUri(Storage.getRedirectAfterLogin() || '/home');
  }, []);

  useEffect(() => {
    if (idToken && accessToken) {
      onLogin(idToken, accessToken, onLoginSuccess).catch((error) => {
        console.error('[onLogin] Error: ', error.message, error);
        if (error?.message.includes('length')) {
          toastError('Please login again');
        } else {
          toastError(error.message || 'Something wrong');
        }
        router.push('/');
      });
    }
  }, [idToken, accessToken]);

  const onLoginSuccess = async (zkUser: any) => {
    try {
      setAccountData({
        ...zkUser,
        connected: true,
        jwt: zkUser.jwt,
      });
      return redirectUrlAfterLogin();
    } catch (err: any) {
      console.error('[onLoginSuccess] Error: ', err.message);
      throw err;
    }
  };

  const redirectUrlAfterLogin = async () => {
    Storage.resetRedirectAfterLogin();
    if (redirectUri) {
      return router.push(redirectUri);
    }
    return router.push('/home');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Oval
          visible={true}
          height="60"
          width="60"
          color="#000000"
          ariaLabel="oval-loading"
        />
        <div className="text-lg font-medium mt-10">Loading...</div>
      </div>
    );
  }

  return <></>;
}
