'use client';
import React, { useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';

export interface TabsProps {
  key: string | number;
  label: React.ReactNode;
  content: React.ReactNode;
}
interface Props {
  tabs: TabsProps[];
}

const AppTabs: React.FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="flex item justify-between border-b border-[#3f3f46] overflow-hidden">
        <div className="flex customer-scroll overflow-x-auto min-w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-4 text-sm font-medium text-gray-400 min-w-fit transition-transform hover:text-gray-200 focus:outline-none'
              ${
                activeTab === tab.key
                  ? 'border-b-2 border-[#959597] text-blue-400'
                  : ''
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="max-desktop:hidden flex items-center gap-1 cursor-pointer">
          <BiSolidEdit color="#a0faa0" />
          <span>New thread</span>
        </div>
      </div>
      <div className="relative overflow-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`w-full mt-4 flex-shrink-0 transition-opacity duration-300 ${
              activeTab === tab.key ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              display: activeTab === tab.key ? 'block' : 'none',
            }}
          >
            {activeTab === tab.key && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AppTabs);
