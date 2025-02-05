'use client';

import { DefaultAvatar } from '@/assets/icons';
import { Chan } from '@/assets/images';
import AppFallbackImage from '@/components/AppFallbackImage';
import React, { useState } from 'react';
import { FaArrowLeftLong, FaArrowRight } from 'react-icons/fa6';

const History = () => {
  const tabs = ['History', 'Tweets', 'Uploads', 'Emails'];
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
    {
      date: '01/29/2025 20:17',
      user: 'Chan',
      action: 'Get tokens owned by 4ikgTURM3Cc...',
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
      date: '01/29/2025 20:16',
      user: 'Griffain',
      action: 'Failed: Delegate To Agent',
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
      date: '01/29/2025 18:42',
      user: 'Chan',
      action: 'Get tokens owned by 4ikgTURM3Cc...',
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
      date: '01/29/2025 18:32',
      user: 'Chan',
      action: 'Get tokens owned by 4ikgTURM3Cc...',
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
      date: '01/28/2025 17:06',
      user: 'Chan',
      action: 'Get tokens owned by 4ikgTURM3Cc...',
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
      date: '01/28/2025 16:55',
      user: 'Griffain',
      action: 'Delegate to Agent Baxus',
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
  const [activeTab, setActiveTab] = useState('History');
  return (
    <div className="w-auto mx-auto p-6 text-white-1000 min-h-screen bg-black-100/40">
      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex gap-6 border-b border-white-100 pb-4">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`relative text-white font-medium cursor-pointer hover:text-neutral-300 transition-colors pb-2 ${
                activeTab === tab
                  ? 'border-b-2 border-white-1000 -mb-[20px]'
                  : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="max-h-96 overflow-auto">
          {historyData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between group hover:bg-white-100 p-2 rounded-md transition-colors mt-2"
            >
              <div className="flex items-center gap-4">
                <div className="text-white-600">{item.date}</div>
                <div className="text-white-1000 ml-1">{item.icon}</div>
                <div className="text-white-1000 font-medium">{item.user}</div>
                <div className="text-white-1000">{item.action}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                </div>
                <button className="text-neutral-400 hover:text-white transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                    <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                    <div className="w-[4px] h-[4px] bg-green-500 rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button className="text-neutral-400 hover:text-white-1000 transition-colors flex items-center gap-2">
            <FaArrowLeftLong className="text-green-600" />
            Previous
          </button>
          <div className="flex gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-700 text-black font-medium">
              1
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-700 text-neutral-400 cursor-pointer">
              2
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
            Next
            <FaArrowRight className="text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default History;
