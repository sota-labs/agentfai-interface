import React from 'react';
import { FaArrowLeftLong, FaArrowRight } from 'react-icons/fa6';

const Threads = () => {
  return (
    <div id="webcrumbs">
      <div className="w-auto bg-neutral-900 min-h-[600px] p-6 font-sans text-sm text-neutral-300">
        <div className="w-full">
          <table className="w-full border-separate border-spacing-y-2">
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
            <tbody>
              {/** First Row */}
              <tr className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-200">
                <td className="p-3 rounded-l-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://webcrumbs.cloud/placeholder"
                      className="w-5 h-5 rounded"
                      alt="Deepseek"
                    />
                    <span>Deepseek</span>
                  </div>
                </td>
                <td className="p-3">Deepseek</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-green-500">
                      chat_bubble
                    </span>
                    <span>5</span>
                  </div>
                </td>
                <td className="p-3 text-neutral-400">02/03/2025 15:45</td>
                <td className="p-3 text-neutral-400">02/03/2025 15:35</td>
                <td className="p-3 rounded-r-lg">
                  <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    </div>
                  </button>
                </td>
              </tr>

              {/** Second Row */}
              <tr className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-200">
                <td className="p-3 rounded-l-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">close</span>
                    <span>X</span>
                  </div>
                </td>
                <td className="p-3">X</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-green-500">
                      chat_bubble
                    </span>
                    <span>1</span>
                  </div>
                </td>
                <td className="p-3 text-neutral-400">02/03/2025 15:34</td>
                <td className="p-3 text-neutral-400">02/03/2025 15:34</td>
                <td className="p-3 rounded-r-lg">
                  <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between mt-4 text-neutral-500">
            <div className="flex items-center gap-1">
              <FaArrowLeftLong />
              <div className="hover:text-neutral-300 transition-colors cursor-pointer">
                Previous
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded">
                1
              </span>
              <span className="px-3 py-1 hover:bg-neutral-700 rounded cursor-pointer">
                2
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="hover:text-neutral-300 transition-colors cursor-pointer">
                Next
              </div>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
