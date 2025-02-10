'use client';

import React, { useState } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AppDataTableBase } from '@/components';
import rf from '@/services/RequestFactory';
import { TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { useRouter } from 'next/navigation';
import { AppPopover } from '@/components/AppPopover';
import { MdDeleteOutline } from 'react-icons/md';
import { toastError, toastSuccess } from '@/libs/toast';
import AppFallbackImage from '@/components/AppFallbackImage';
import { useMetadata } from '@/libs/zustand/metadata';
import { DefaultImage } from '@/assets/images';

const ThreadItem = ({
  thread,
  fetchData,
}: {
  thread: TThread;
  fetchData: () => void;
}) => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);
  const router = useRouter();
  const { listAgents } = useMetadata();

  const agentActive = listAgents.find(
    (item) => item.agentId === thread.activeAgentId,
  );

  const onDelete = async () => {
    try {
      await rf.getRequest('ThreadRequest').deleteThread(thread.id);
      toastSuccess('Thread deleted successfully');
      fetchData();
      setIsPopoverMenu(false);
    } catch (e: any) {
      toastError(e.message || 'Something went wrong!');
      setIsPopoverMenu(false);
      console.error(e);
    }
  };

  return (
    <tr
      onClick={() => router.push(`/threads/${thread.id}`)}
      className="hover:bg-white-50 transition-all duration-200 cursor-pointer"
    >
      <td className="p-2.5 px-2 border-b border-white-50 ">
        <div className="truncate w-[250px]">{thread.name}</div>
      </td>
      <td className="p-2.5 px-2 border-b border-white-50">
        <div className="flex gap-2 items-center">
          <AppFallbackImage
            alt={agentActive?.name || '--'}
            className="rounded-full"
            src={agentActive?.logoUrl || ''}
            fallbackSrc={DefaultImage}
            width={24}
            height={24}
          />
          <div>{agentActive?.name || '--'}</div>
        </div>
      </td>
      <td className="p-2.5 px-2 border-b border-white-50">
        <div className="flex items-center gap-1">{thread.totalMessages}</div>
      </td>
      <td className="p-2.5 px-2 border-b border-white-50 text-neutral-400">
        {formatUnixTimestamp(thread.lastViewedAt * 1000, 'DD/MM/YYYY HH:mm')}
      </td>
      <td className="p-2.5 px-2 border-b border-white-50 text-neutral-400">
        {formatUnixTimestamp(thread.createdAt * 1000, 'DD/MM/YYYY HH:mm')}
      </td>
      <td
        className="p-2.5 px-2 border-b border-white-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-max">
          <AppPopover
            isOpen={isPopoverMenu}
            onToggle={(isOpen) => setIsPopoverMenu(isOpen)}
            onClose={() => setIsPopoverMenu(false)}
            trigger={
              <div className="cursor-pointer w-[24px] h-[24px] rounded-[6px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
                <HiOutlineDotsVertical />
              </div>
            }
            position="right"
            content={
              <>
                <div
                  className="cursor-pointer py-1 px-2 text-white-0 rounded-[6px] hover:bg-white-50 transition-all flex items-center gap-1"
                  onClick={onDelete}
                >
                  <MdDeleteOutline />
                  Delete
                </div>
              </>
            }
            customClassWrapper="min-w-[110px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
          />
        </div>
      </td>
    </tr>
  );
};

const Threads = () => {
  const [params, setParams] = useState<any>({});

  const getThreads = async (payload: any) => {
    try {
      const res = await rf.getRequest('ThreadRequest').getThreads(payload);
      return {
        docs: res?.docs,
        totalPages: res?.totalPages,
      };
    } catch (e) {
      console.error(e);
    }
  };

  const _renderContent = (data: TThread[]) => {
    return (
      <tbody>
        {data.map((item: TThread, index: number) => {
          return (
            <ThreadItem
              thread={item}
              key={index}
              fetchData={() => setParams({ ...params })}
            />
          );
        })}
      </tbody>
    );
  };

  const _renderHeader = () => {
    return (
      <thead>
        <tr className="text-neutral-500">
          <th className="text-left py-2">Title</th>
          <th className="text-left">Active Agent</th>
          <th className="text-left">Messages</th>
          <th className="text-left">Last Viewed</th>
          <th className="text-left">Created At</th>
          <th></th>
        </tr>
      </thead>
    );
  };

  return (
    <div>
      <div className="w-auto min-h-[600px] p-6 text-neutral-300">
        <div className="flex justify-end">
          <div className="flex gap-2 cursor-pointer items-center hover:text-neutral-300 transition-colors cursor-pointer">
            Create At <FaArrowDownLong className="text-[#a0faa0]" />
          </div>
        </div>
        <div className="w-full">
          <AppDataTableBase
            isLoadingOnce
            requestParams={params}
            fetchData={getThreads}
            renderBody={_renderContent}
            renderHeader={_renderHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default Threads;
