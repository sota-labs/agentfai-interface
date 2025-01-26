import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="max-tablet:pt-[82px]">{children}</div>
    </div>
  );
};
