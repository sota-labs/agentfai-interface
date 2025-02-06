'use client';

import { useRaidenXCallback } from '@/hooks/useRaidenXCallback';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';

export default function RaidenXCallbackPage() {
  const router = useRouter();
  const onCompleted = () => {
    router.push('/home');
  };

  const { isLoading } = useRaidenXCallback({ callback: onCompleted });

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
