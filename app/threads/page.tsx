import React from 'react';
import {
  FaArrowLeftLong,
  FaArrowRight,
  FaArrowDownLong,
} from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const Threads = () => {
  return (
    <div>
      <div className="w-auto min-h-[600px] p-6 text-neutral-300">
        <div className="flex justify-end">
          <div className="flex gap-2 cursor-pointer items-center hover:text-neutral-300 transition-colors cursor-pointer">
            Create At <FaArrowDownLong className="text-[#a0faa0]" />
          </div>
        </div>
        <div className="w-full">
          <table className="w-full">
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
              <tr className="hover:bg-white-50 transition-all duration-200 ">
                <td className="p-2.5 border-b border-white-50">
                  <div className="flex items-center gap-2">Token</div>
                </td>
                <td className="p-2.5 border-b border-white-50">Chan</td>
                <td className="p-2.5 border-b border-white-50">
                  <div className="flex items-center gap-1">1</div>
                </td>
                <td className="p-2.5 border-b border-white-50 text-neutral-400">
                  02/03/2025 15:34
                </td>
                <td className="p-2.5 border-b border-white-50 text-neutral-400">
                  02/03/2025 15:34
                </td>
                <td className="p-2.5 border-b border-white-50">
                  <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    <HiOutlineDotsVertical className="text-[#a0faa0]"/>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-white-50 transition-all duration-200 ">
                <td className="p-2.5.5 border-b border-white-50">
                  <div className="flex items-center gap-2">Token</div>
                </td>
                <td className="p-2.5 border-b border-white-50">Chan</td>
                <td className="p-2.5 border-b border-white-50">
                  <div className="flex items-center gap-1">1</div>
                </td>
                <td className="p-2.5 border-b border-white-50 text-neutral-400">
                  02/03/2025 15:34
                </td>
                <td className="p-2.5 border-b border-white-50 text-neutral-400">
                  02/03/2025 15:34
                </td>
                <td className="p-2.5 border-b border-white-50">
                  <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    <HiOutlineDotsVertical className="text-[#a0faa0]"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between mt-4 text-neutral-500">
            <div className="flex items-center gap-1">
              <FaArrowLeftLong className="text-[#a0faa0]" />
              <div className="hover:text-neutral-300 transition-colors cursor-pointer">
                Previous
              </div>
            </div>
            <div className="flex gap-1">
              <span className="px-2.5 py-1 bg-white-50 hover:bg-white-50 text-neutral-300 rounded">
                1
              </span>
              <span className="px-2.5 py-1 hover:bg-white-50 rounded cursor-pointer">
                2
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="hover:text-neutral-300 transition-colors cursor-pointer">
                Next
              </div>
              <FaArrowRight className="text-[#a0faa0]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
