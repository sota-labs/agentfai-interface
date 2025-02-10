import { useLogin } from '@/hooks/useLogin';
import React, { useState } from 'react';
import { AppButton } from './AppButton';

const Header = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useLogin();
  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onLogin = () => {
    setIsLoading(true);
    login()
      .then()
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
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
        <AppButton
          onClick={onLogin}
          isLoading={isLoading}
          className="border-none bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-md text-[14px]"
        >
          Get Started
        </AppButton>
      </div>
    </nav>
  );
};

export default Header;
