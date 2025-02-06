'use client';

import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AppDataTableBase } from '@/components';
import rf from '@/services/RequestFactory';
import { TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';

const ThreadItem = ({ thread }: { thread: TThread }) => {
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
        <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
          <HiOutlineDotsVertical className="text-[#a0faa0]" />
        </button>
      </td>
    </tr>
  );
};

const Threads = () => {
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
          return <ThreadItem thread={item} key={index} />;
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
