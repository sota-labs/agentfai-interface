'use client';
import React from 'react';

const LabelComingSoon = ({ classNames }: { classNames?: string }) => {
  return (
    <>
      <div
        className={`${classNames} text-[12px] text-white-700 bg-white-150 border border-white-150 rounded-sm`}
      >
        Coming Soon
      </div>
    </>
  );
};

export default LabelComingSoon;
