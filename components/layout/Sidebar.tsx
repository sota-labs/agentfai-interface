'use client';
import {
  CloseIcon,
  DefaultAvatar,
  DocumentIcon,
  MobileIcon,
} from '@/assets/icons';
import { AppButton } from '@/components/AppButton';
import { EPathName } from '@/constants/pathName';
import { useCommonStore } from '@/libs/zustand/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { BiSolidEdit } from 'react-icons/bi';
import { GoClockFill } from 'react-icons/go';
import { MdContactSupport, MdHome } from 'react-icons/md';
import AppFallbackImage from '../AppFallbackImage';
import { Chan } from '@/assets/images';
import { RiAccountCircleFill } from 'react-icons/ri';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaInbox } from 'react-icons/fa';
import { CiGift } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';

const Sidebar = () => {
  const pathname = usePathname();
  const { isOpenSidebar, toggleSidebar } = useCommonStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);
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
    // {
    //   icon: (
    //     <div className="text-[#a1a1aa] group-hover:text-white-0">
    //       <BsFillInboxFill />
    //     </div>
    //   ),
    //   label: 'Inbox',
    //   href: '#',
    // },
  ];
  const agents = [
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <AppFallbackImage
            src={Chan}
            alt="solana"
            width={15}
            height={15}
            className="rounded-full"
            fallbackSrc={DefaultAvatar}
          />
        </div>
      ),
      label: 'Chan',
      href: '/chan',
    },
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <AppFallbackImage
            src={Chan}
            alt="solana"
            width={15}
            height={15}
            className="rounded-full"
            fallbackSrc={DefaultAvatar}
          />
        </div>
      ),
      label: 'Raidenx',
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
                className={`${
                  item.href === pathname
                    ? 'border--2 border-[#959597] text-blue-400'
                    : 'text-[#a1a1aa]'
                } flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group : '`}
              >
                {item.icon}
                <span
                  className={`${
                    item.href === pathname
                      ? 'border--2 border-[#959597] text-blue-400'
                      : 'text-[#a1a1aa]'
                  } group-hover:text-white-0`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          <div>
            <h3 className="text-neutral-500 text-xs p-[8px]">Agents</h3>
            <div className="mt-2 flex flex-col gap-2">
              {agents.map((item) => (
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
            </div>
          </div>

          <div className="mt-4 p-[8px]">
            <h3 className="text-neutral-500 text-xs">Recent Threads</h3>
            <ul className="mt-2 flex flex-col gap-2">
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
          <div className="text-neutral-500 text-sm relative">
            <AppButton onClick={toggleModal}>Account</AppButton>
            {isModalOpen && (
              <div className="absolute bottom-full mx-auto mb-2 right-0 bg-[#1E1E1E] p-3 rounded-lg w-full shadow-lg border border-white-100">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <RiAccountCircleFill />
                    <div className="p-1 hover:bg-white-100 text-white-1000 rounded w-full">
                      Account
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AiOutlineTeam />
                    <div className="p-1 hover:bg-white-100 text-white-1000 rounded w-full">
                      Team
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaInbox />
                    <div className="p-1 hover:bg-white-100 text-white-1000 rounded w-full">
                      Inbox
                    </div>
                  </div>
                  <div className="flex items-center border-b border-white-100">
                    <CiGift />
                    <div className="p-1 hover:bg-white-100 text-white-1000 rounded w-full">
                      Gift
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoIosLogOut />
                    <div className="p-1 hover:bg-white-100 rounded text-white-1000 w-full">
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
