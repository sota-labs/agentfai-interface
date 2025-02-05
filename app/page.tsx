'use client';

import { useLogin } from '@/hooks/useLogin';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useAuthStore } from '@/libs/zustand/auth';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { isLoading, login } = useLogin();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { connected } = useAuthStore();
  const router = useRouter();

  const onLogin = () => {
    if (connected) {
      router.push('/home');
      return;
    }
    login().then();
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Oval
          visible={true}
          height="60"
          width="60"
          color="#000000"
          ariaLabel="oval-loading"
        />
        <div className="text-lg font-medium mt-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white relative">
      <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium">Agentfai</span>
          </div>
          <button className="md:hidden" onClick={() => toggleSidebar()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:opacity-80 transition-opacity">
            Docs
          </a>
          <button
            className="bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-md"
            onClick={onLogin}
          >
            Get Started
          </button>
        </div>
      </nav>

      <>
        {isOpenSidebar && (
          <div
            className="fixed inset-0 bg-black-100/40 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`w-[320px] bg-[#09090B] top-0 text-neutral-200 flex flex-col px-3 absolute h-screen transform transition-transform duration-300 z-50 sidebar ${
            isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div
            className="py-3 flex justify-between border-b border-gray-800"
            onClick={() => toggleSidebar()}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">Agentfai</span>
            </div>

            <button className="ml-auto block" data-drawer-dismiss="mobile-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <a
              href="#"
              className="hover:bg-gray-800 py-3 rounded-md transition-colors"
            >
              Docs
            </a>
            <button
              className="bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-md"
              onClick={onLogin}
            >
              Get Started
            </button>
          </div>
        </div>
      </>

      <main className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 pt-16 md:pt-32 max-w-7xl mx-auto gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 justify-center md:justify-start">
            Hi, I&apos;m Agentfai
            <span className="animate-wave">👋</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            I power the Agent Engine to help you turn intent into action.
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md mt-4 w-full sm:w-auto"
            onClick={onLogin}
          >
            Get Started
          </button>
        </div>

        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-orange-500 rounded-full animate-spin-slow blur-xl opacity-50" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-orange-500 rounded-full animate-spin-slow"
            style={{ animationDelay: '-5s' }}
          />
        </div>
      </main>
    </div>
  );
}
