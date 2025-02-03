'use client';
import { CloseIcon, DocumentIcon, MobileIcon } from '@/assets/icons';
import { AppButton } from '@/components/AppButton';
import { EPathName } from '@/constants/pathName';
import { toastSuccess } from '@/libs/toast';
import { useCommonStore } from '@/libs/zustand/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { BiSolidEdit } from 'react-icons/bi';
import { BsFillInboxFill } from 'react-icons/bs';
import { GoClockFill } from 'react-icons/go';
import { MdContactSupport, MdHome } from 'react-icons/md';
const Sidebar = () => {
  const pathname = usePathname();
  const { isOpenSidebar, toggleSidebar } = useCommonStore();
  const menuTopSidebar = [
    {
      icon: (
        <MdHome size={16} className="text-[#a1a1aa] group-hover:text-white-0" />
      ),
      label: 'Home',
      href: EPathName.HOME,
    },
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <GoClockFill />
        </div>
      ),
      label: 'History',
      href: '#',
    },
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <BsFillInboxFill />
        </div>
      ),
      label: 'Inbox',
      href: '#',
    },
  ];
  return (
    <>
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black-100/40 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`desktop:w-[256x] w-[320px] bg-[#09090B] text-neutral-200 flex flex-col p-4 desktop:relative absolute h-screen transform desktop:translate-x-0 transition-transform duration-300 z-50 sidebar ${
          isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="desktop:hidden mb-[24px] flex items-center">
          <div onClick={toggleSidebar} className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>
        <div className="mb-6">
          <AppButton>
            <BiSolidEdit color="#a0faa0" />
            <span>New thread</span>
          </AppButton>
        </div>
        <div className="flex flex-col">
          <nav className="flex flex-col gap-2 mb-6">
            {menuTopSidebar.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group"
              >
                {item.icon}
                <span
                  className={`${
                    item.href === pathname ? 'text-white-0' : 'text-[#a1a1aa]'
                  } group-hover:text-white-0`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          <div>
            <h3 className="text-neutral-500 text-sm">Recent Threads</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-primary-50">Tokens</li>
            </ul>
          </div>
        </div>
        <div className="mt-auto text-neutral-500 text-sm space-y-6">
          <div>
            <div className="cursor-pointer flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group">
              <MdContactSupport className="text-[#a1a1aa] group-hover:text-white-0" />
              <span className="text-[#a1a1aa] group-hover:text-white-0">
                Support
              </span>
            </div>
            <div className="cursor-pointer flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group">
              <div className="text-[#a1a1aa] group-hover:text-white-0">
                <DocumentIcon />
              </div>
              <span className="text-[#a1a1aa] group-hover:text-white-0">
                Docs
              </span>
            </div>
            <div className="cursor-pointer flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group">
              <div className="text-[#a1a1aa] group-hover:text-white-0">
                <MobileIcon />
              </div>
              <span className="text-[#a1a1aa] group-hover:text-white-0">
                Mobile
              </span>
            </div>
          </div>
          <AppButton onClick={() => toastSuccess('test')}>Chan</AppButton>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
