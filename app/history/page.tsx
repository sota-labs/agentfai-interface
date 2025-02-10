'use client';

import React, { useState } from 'react';
import { HistoryList } from './parts';

const History = () => {
  const [activeTab, setActiveTab] = useState('History');
  const tabs = [
    'History',
    // 'Tweets',
    // 'Uploads',
    // 'Emails'
  ];

  const _renderContentTab = () => {
    switch (activeTab) {
      case 'History': {
        return <HistoryList />;
      }
      case 'Tweets': {
        return <div>Tweets</div>;
      }
      case 'Uploads': {
        return <div>Uploads</div>;
      }
      case 'Emails': {
        return <div>Emails</div>;
      }
      default: {
        return <HistoryList />;
      }
    }
  };

  return (
    <div className="w-auto mx-auto p-6 text-white-1000">
      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex gap-6 border-b border-white-100">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`relative text-white font-medium cursor-pointer hover:text-neutral-300 transition-colors pb-2 ${
                activeTab === tab ? 'border-b-2 border-white-1000' : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div>{_renderContentTab()}</div>
      </div>
    </div>
  );
};
export default History;
