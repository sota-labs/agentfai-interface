'use client';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToastContainer
      autoClose={3000}
      position="top-right"
      icon={false}
      pauseOnHover
      closeButton={false}
      hideProgressBar
      toastStyle={{
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        marginBottom: '12px',
        padding: '8px',
      }}
      theme="dark"
    />
  );
}
