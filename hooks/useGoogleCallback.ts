'use client';

import { toastError } from '@/libs/toast';
import { useEffect, useState } from 'react';

export const useGoogleCallback = () => {
  const [idToken, setIdToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    const responseParams = new URLSearchParams(window.location.hash.replace('#', ''));
    setIdToken(responseParams.get('id_token') || '');
    setAccessToken(responseParams.get('access_token') || '');
    setError(responseParams.get('error') || '');
    const state = responseParams.get('state');
    if (state) {
      setRedirectUri(atob(state));
    }
  }, []);

  useEffect(() => {
    if (error === 'access_denied') {
      setTimeout(() => {
        toastError('Login with Google failed: Access Denied');
      }, 1000);
    }
  }, [error]);

  return {
    idToken,
    accessToken,
    redirectUri,
    error,
  };
};
