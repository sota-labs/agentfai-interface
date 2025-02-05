'use client';

import { useEffect, useState } from 'react';

export default function RaidenXCallbackPage() {
  const [code, setCode] = useState('');
  useEffect(() => {
    const responseParams = new URLSearchParams(
      window.location.hash.replace('#', ''),
    );
    const code = responseParams.get('code') || '';
    setCode(code);
    console.log(responseParams, 'responseParams');
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }

    console.log(code);
  }, [code]);

  return <></>;
}
