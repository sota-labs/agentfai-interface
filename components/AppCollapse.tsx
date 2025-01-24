import React, { useState } from 'react';

interface AppCollapseProps {
  title: string;
  children: React.ReactNode;
}

const AppCollapse: React.FC<AppCollapseProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white-200 rounded-lg px-6 py-4">
      <div
        className="flex justify-between cursor-pointer"
        onClick={toggleCollapse}
      >
        {title}
        {/* <ArrowRight2Icon className={isOpen ? 'rotate-90 transition-all' : ''} /> */}
        <div className={isOpen ? 'rotate-90 transition-all' : ''}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-white-800"
          >
            <path
              fill-rule="evenodd"
              d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div
        className={` ${isOpen ? 'open ' : ''}`}
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default AppCollapse;
