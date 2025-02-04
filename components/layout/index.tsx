'use client';
import Sidebar from '@/components/layout/Sidebar';
import { useCommonStore } from '@/libs/zustand/store';
import { setAuthorizationToRequest } from '@/services/BaseRequest';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';

export const Layout = ({ children, authorization }: { children: ReactNode, authorization?: string }) => {
  const pathname = usePathname();
  const { toggleSidebar } = useCommonStore();
  useEffect(() => {
    if (authorization) {
      setAuthorizationToRequest(authorization);
    }
  }, [authorization]);

  const isHideSidebar = ['/', '/google/callback'].includes(pathname);
  if (isHideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full bg-[#18181A] text-primary-50 flex md:flex-row flex-col">
      <Sidebar />
      <main className="flex-1 p-8 max-w-7xl mx-auto max-desktop:p-[16px] max-desktop:max-w-full max-desktop:mx-0">
        <div className="desktop:hidden h-[32px]">
          <div onClick={toggleSidebar} className="cursor-pointer inline-block">
            <IoIosMenu size="24" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
