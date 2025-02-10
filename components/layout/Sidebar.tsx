'use client';

import { CloseIcon, DefaultAvatar, DocumentIcon } from '@/assets/icons';
import { EPathName } from '@/constants/pathName';
import { useCommonStore } from '@/libs/zustand/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Chan } from '@/assets/images';
import { useMetadata } from '@/libs/zustand/metadata';
import rf from '@/services/RequestFactory';
import { TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { GoClockFill } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiWallet } from 'react-icons/hi2';
import { MdContactSupport } from 'react-icons/md';
import AppFallbackImage from '../AppFallbackImage';
import AccountMenu from './AccountMenu';
import LabelComingSoon from './labelComingSoon';

const Sidebar = () => {
  const [threads, setThreads] = useState<TThread[]>([]);
  const [totalThread, setTotalThread] = useState<number>(0);
  const pathname = usePathname();
  const { isOpenSidebar, toggleSidebar } = useCommonStore();

  const menuTopSidebar = [
    {
      icon: (
        <AppFallbackImage
          src={Chan}
          alt="solana"
          width={15}
          height={15}
          className="rounded-full"
          fallbackSrc={DefaultAvatar}
        />
      ),
      label: 'Griffain',
      href: EPathName.HOME,
    },
  ];
  const menuSidebar = [
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <HiWallet
            size={16}
            className="text-[#a1a1aa] group-hover:text-white-0"
          />
        </div>
      ),
      label: 'Wallet',
      href: EPathName.WALLET,
    },
    {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <GoClockFill
            size={16}
            className="text-[#a1a1aa] group-hover:text-white-0"
          />
        </div>
      ),
      label: 'History',
      href: EPathName.HISTORY,
    },
  ];

  const { listAgentsWithIsConnected } = useMetadata();
  const agentsConnected = listAgentsWithIsConnected.filter(
    (agent) => agent.isConnected,
  );

  const listAgentsSidebar = agentsConnected.map((agent) => {
    return {
      icon: (
        <div className="text-[#a1a1aa] group-hover:text-white-0">
          <AppFallbackImage
            src={agent?.logoUrl || DefaultAvatar}
            alt="solana"
            width={15}
            height={15}
            className="rounded-full"
            fallbackSrc={DefaultAvatar}
          />
        </div>
      ),
      label: agent.name,
      href: `/agent/${agent.agentId}`,
    };
  });

  const getRecentThreads = async () => {
    try {
      const res = await rf.getRequest('ThreadRequest').getThreads({
        page: 1,
        limit: 3,
      });
      setThreads(res?.docs);
      setTotalThread(res?.totalDocs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecentThreads().then();
  }, []);

  return (
    <>
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black-100/40 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
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
        <div className="flex flex-col">
          <nav className="flex flex-col gap-2 mb-1 border-b border-white-50 pb-3">
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

          <nav className="flex flex-col gap-2 mb-0">
            {menuSidebar.map((item) => (
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
          {listAgentsSidebar?.length > 0 && (
            <div>
              <h3 className="text-neutral-500 text-xs p-[8px] mt-4\">Agents</h3>
              <div className="flex flex-col gap-2">
                {listAgentsSidebar.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group"
                  >
                    {item.icon}
                    <span
                      className={`${
                        item.href === pathname
                          ? 'text-white-0'
                          : 'text-[#a1a1aa]'
                      } group-hover:text-white-0`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 p-[8px]">
            <h3 className="text-neutral-500 text-xs">Recent Threads</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {threads?.map((thread, index) => {
                return (
                  <li
                    key={index}
                    className="text-white-700 hover:text-white-1000"
                  >
                    <Link href={`${EPathName.THREADS}/${thread.id}`}>
                      Thread from{' '}
                      {formatUnixTimestamp(thread?.createdAt * 1000, 'DD/MM')}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {totalThread > 3 && (
              <Link
                href={EPathName.THREADS}
                className="flex gap-2 mt-2 items-center"
              >
                <HiOutlineDotsHorizontal size={20} />
                <div className="text-xs">View More</div>
              </Link>
            )}
          </div>
        </div>
        <div className="mt-auto text-neutral-500 text-sm space-y-6">
          <div>
            <div className="cursor-pointer flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group">
              <MdContactSupport className="text-[#a1a1aa] group-hover:text-white-0" />
              <div className="flex items-center gap-1">
                <span className="text-[#a1a1aa] group-hover:text-white-0">
                  Support
                </span>
                <LabelComingSoon />
              </div>
            </div>
            <div className="cursor-pointer flex items-center gap-2 font-semibold p-[8px] rounded-[8px] transition-all hover:bg-[#FFFFFF0D] group">
              <div className="text-[#a1a1aa] group-hover:text-white-0">
                <DocumentIcon />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#a1a1aa] group-hover:text-white-0">
                  Docs
                </span>
                <LabelComingSoon />
              </div>
            </div>
          </div>

          <AccountMenu />
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
