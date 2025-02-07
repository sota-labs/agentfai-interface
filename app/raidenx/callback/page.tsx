'use client';

import { useRaidenXCallback } from '@/hooks/useRaidenXCallback';
import { AgentT } from '@/libs/agents/type';
import { toastError } from '@/libs/toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import rf from '@/services/RequestFactory';
import { useMetadata } from '@/libs/zustand/metadata';

export default function RaidenXCallbackPage() {
  const router = useRouter();
  const { setListAgentsWithIsConnected, setAgents } = useMetadata();
  
  const onCompleted = () => {
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
      setAgents(agents);
    };

    fetchAgentsData();
    router.push('/home');
  };

  const { isLoading, error } = useRaidenXCallback({ callback: onCompleted });

  useEffect(() => {
    if (error) {
      toastError('Failed to login with RaidenX');
      router.push('/home');
    }
  }, [error]);

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

  return <></>;
}
