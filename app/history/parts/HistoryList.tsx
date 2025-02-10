import { HiOutlineDotsVertical } from 'react-icons/hi';
import React, { useState } from 'react';
import { AppDataTableBase } from '@/components';
import rf from '@/services/RequestFactory';
import { TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { AppPopover } from '@/components/AppPopover';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useMetadata } from '@/libs/zustand/metadata';
import AppFallbackImage from '@/components/AppFallbackImage';
import { toastError, toastSuccess } from '@/libs/toast';
import { AgentFI } from '@/assets/images';

const HistoryItem = ({
  thread,
  fetchData,
}: {
  thread: TThread;
  fetchData: () => void;
}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { listAgents } = useMetadata();

  const router = useRouter();
  const agentActive = listAgents.find(
    (item) => item.agentId === thread.activeAgentId,
  );

  const onDelete = async () => {
    try {
      await rf.getRequest('ThreadRequest').deleteThread(thread.id);
      toastSuccess('History deleted successfully');
      fetchData();
      setIsShowMenu(false);
    } catch (e: any) {
      toastError(e.message || 'Something went wrong!');
      setIsShowMenu(false);
      console.error(e);
    }
  };

  return (
    <tr
      onClick={() => router.push(`/threads/${thread.id}`)}
      className="hover:bg-white-50 transition-all duration-200 cursor-pointer"
    >
      <td className="p-2.5 border-b border-white-50 text-neutral-400">
        {formatUnixTimestamp(thread.createdAt * 1000, 'DD/MM/YYYY HH:mm')}
      </td>

      <td className="p-2.5 border-b border-white-50 ">
        <div className="flex gap-2 items-center">
          <AppFallbackImage
            alt={agentActive?.name || '--'}
            className="rounded-full"
            fallbackSrc={AgentFI}
            src={agentActive?.logoUrl || ''}
            width={24}
            height={24}
          />
          <div>{agentActive?.name || '--'}</div>
        </div>
      </td>
      <td className="p-2.5 border-b border-white-50 ">
        <div className="truncate w-full">{thread.name}</div>
      </td>

      <td className="p-2.5 border-b border-white-50 ">
        <div className="flex gap-1 justify-end">
          <div className="w-[3px] h-[3px] bg-[#29D971] rounded-full" />
          <div className="w-[3px] h-[3px] bg-[#29D971] rounded-full" />
          <div className="w-[3px] h-[3px] bg-[#29D971] rounded-full" />
          <div className="w-[3px] h-[3px] bg-[#29D971] rounded-full" />
          <div className="w-[3px] h-[3px] bg-[#29D971] rounded-full" />
        </div>
      </td>
      <td
        className="p-2.5 border-b border-white-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-max mx-auto">
          <AppPopover
            isOpen={isShowMenu}
            onToggle={(isOpen) => setIsShowMenu(isOpen)}
            onClose={() => setIsShowMenu(false)}
            trigger={
              <div className="cursor-pointer w-[24px] h-[24px] rounded-[6px] text-[#29D971] flex items-center justify-center hover:bg-[#29D971]/25 transition-colors duration-300">
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

export const HistoryList = () => {
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
            <HistoryItem
              thread={item}
              key={index}
              fetchData={() => setParams({ ...params })}
            />
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="w-full mt-4">
      <AppDataTableBase
        requestParams={params}
        isLoadingOnce
        fetchData={getThreads}
        renderBody={_renderContent}
      />
    </div>
  );
};
