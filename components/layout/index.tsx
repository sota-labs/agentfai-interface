'use client';
import Sidebar from '@/components/layout/Sidebar';
import { AgentT } from '@/libs/agents/type';
import { useAuthStore } from '@/libs/zustand/auth';
import { useMetadata } from '@/libs/zustand/metadata';
import { useCommonStore } from '@/libs/zustand/store';
import { setAuthorizationToRequest } from '@/services/BaseRequest';
import rf from '@/services/RequestFactory';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';
export const Layout = ({
  children,
  authorization,
}: {
  children: ReactNode;
  authorization?: string;
}) => {
  const pathname = usePathname();
  const { toggleSidebar } = useCommonStore();
  const router = useRouter();
  const isHideSidebar = ['/', '/google/callback', '/raidenx/callback'].includes(
    pathname,
  );
  const { setListAgentsWithIsConnected } = useMetadata();
  const { zkAddress } = useAuthStore();

  useEffect(() => {
    if (!zkAddress) return;
    const fetchAgentsData = async () => {
      const [agents, listAgentsConnected] = await Promise.all([
        rf.getRequest('AgentRequest').getListAgents(),
        rf.getRequest('AgentRequest').getConnectedAgents(),
      ]);
      const listAgentsWithIsConnected = agents.map((agent: AgentT) => {
        return {
          ...agent,
          isConnected: listAgentsConnected.some(
            (agentConnected: AgentT) =>
              agentConnected.agentId === agent.agentId,
          ),
        };
      });
      setListAgentsWithIsConnected(listAgentsWithIsConnected);
    };

    fetchAgentsData();
  }, [zkAddress]);

  useEffect(() => {
    if (!!authorization) {
      setAuthorizationToRequest(authorization);
      return;
    }

    if (!authorization && !isHideSidebar) {
      router.push('/');
    }
  }, [authorization]);

  if (isHideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full bg-[#18181A] text-primary-50 flex md:flex-row flex-col">
      <Sidebar />
      <main className="flex-1 p-8 max-w-7xl mx-auto max-desktop:p-[16px] max-desktop:max-w-full max-desktop:mx-0">
        <div className="desktop:hidden h-[32px]">
          <div onClick={toggleSidebar} className="cursor-pointer inline-block">
            <IoIosMenu size="24" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
