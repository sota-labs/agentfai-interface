'use client';

import React, { useState } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { AppDataTableBase } from '@/components';
import rf from '@/services/RequestFactory';
import { TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { MenuDotIcon } from '@/assets/icons';
import { AppPopover } from '@/components/AppPopover';
import { MdDeleteOutline } from 'react-icons/md';

import { toastSuccess } from '@/libs/toast';

const ThreadItem = ({
  thread,
  onDelete,
}: {
  thread: TThread;
  onDelete: (id: string) => void;
}) => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);

  const deleteThread = async () => {
    try {
      await rf.getRequest('ThreadRequest').deleteThread(thread.id);
      toastSuccess('Success!', 'Thread deleted successfully');
      onDelete(thread.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <tr className="hover:bg-white-50 transition-all duration-200 ">
      <td className="p-2.5 border-b border-white-50">
        <div className="flex items-center gap-2">--</div>
      </td>
      <td className="p-2.5 border-b border-white-50">--</td>
      <td className="p-2.5 border-b border-white-50">
        <div className="flex items-center gap-1">--</div>
      </td>
      <td className="p-2.5 border-b border-white-50 text-neutral-400">--</td>
      <td className="p-2.5 border-b border-white-50 text-neutral-400">
        {formatUnixTimestamp(thread.createdAt * 1000, 'DD/MM/YYYY HH:mm')}
      </td>
      <td className="p-2.5 border-b border-white-50">
        <AppPopover
          isOpen={isPopoverMenu}
          onToggle={(isOpen) => setIsPopoverMenu(isOpen)}
          onClose={() => setIsPopoverMenu(false)}
          trigger={
            <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
              <MenuDotIcon />
            </div>
          }
          position="left"
          content={
            <>
              <p
                className="cursor-pointer py-[6px] px-[20px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all flex items-center gap-2"
                onClick={deleteThread}
              >
                <MdDeleteOutline />
                Delele
              </p>
            </>
          }
          customClassWrapper="min-w-[110px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
        />
      </td>
    </tr>
  );
};

const Threads = () => {
  const [threads, setThreads] = useState<TThread[]>([]);
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
  const handleDeleteThread = (id: string) => {
    setThreads((prev) => prev.filter((thread) => thread.id !== id));
  };

  const _renderContent = (data: TThread[]) => {
    return (
      <tbody>
        {data.map((item: TThread, index: number) => {
          return (
            <ThreadItem
              thread={item}
              key={index}
              onDelete={handleDeleteThread}
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
          <div className="flex gap-2 cursor-pointer items-center hover:text-neutral-300 transition-colors">
            Create At <FaArrowDownLong className="text-[#a0faa0]" />
          </div>
        </div>
        <div className="w-full">
          <AppDataTableBase
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
