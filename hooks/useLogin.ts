import { useState } from 'react';
import config from '@/config';
import { getZkLoginUrl, handleZkLoginByGoogle } from '@/libs/zklogin/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirectUri, setRedirectUri] = useState<string>('/home');
  const [callbackUri, setCallBackUri] = useState<string>(
    config.googleCallbackUrl,
  );

  const login = async () => {
    try {
      const url = await getZkLoginUrl(callbackUri, redirectUri);
      console.log('zkLoginUrl', url);
      window.location.replace(url);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogin = async (
    idToken: string,
    accessToken: string,
    onLoginSuccess: any,
  ) => {
    setIsLoading(true);
    try {
      const zkUser = await handleZkLoginByGoogle({
        accessToken,
        idToken,
      });
      await onLoginSuccess(zkUser);
      return zkUser;
    } catch (err: any) {
      console.error('[onLogin] Error: ', err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    onLogin,
    isLoading,
    redirectUri,
    setIsLoading,
    setRedirectUri,
    setCallBackUri,
  };
};
