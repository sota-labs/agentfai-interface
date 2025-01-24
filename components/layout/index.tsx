import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="pt-[51px] max-tablet:pt-[82px]">{children}</div>
    </div>
  );
};
