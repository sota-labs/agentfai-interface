import { HiOutlineDotsVertical } from 'react-icons/hi';
import React from 'react';
import AppFallbackImage from '../../../components/AppFallbackImage';
import { Chan } from '../../../assets/images';
import { DefaultAvatar } from '../../../assets/icons';

const historyData = [
  {
    date: '02/03/2025 15:35',
    user: 'Twoface',
    action: 'Flip tails',
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
  },
  {
    date: '02/03/2025 15:25',
    user: 'Griffain',
    action: 'Delegate to Agent Chan',
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
  },
  {
    date: '02/03/2025 15:24',
    user: 'Baxus',
    action: 'Get portfolio',
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
  },
  {
    date: '02/02/2025 20:27',
    user: 'Griffain',
    action: 'Delegate to Agent Backpack',
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
  },
];

export const HistoryList = () => {
  return (
    <div>
      {historyData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between group hover:bg-white-50 p-2.5 transition-colors mt-2"
        >
          <div className="flex items-center gap-4">
            <div className="text-white-600">{item.date}</div>
            <div className="flex gap-2 items-center w-[100px] truncate">
              <div>{item.icon}</div>
              <div className="text-white-1000 font-medium">{item.user}</div>
            </div>
            <div className="text-white-1000 flex-1 truncate">{item.action}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-[3px] h-[3px] bg-green-500 rounded-full" />
              <div className="w-[3px] h-[3px] bg-green-500 rounded-full" />
              <div className="w-[3px] h-[3px] bg-green-500 rounded-full" />
              <div className="w-[3px] h-[3px] bg-green-500 rounded-full" />
              <div className="w-[3px] h-[3px] bg-green-500 rounded-full" />
            </div>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <HiOutlineDotsVertical className="text-[#a0faa0]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};