'use client';

import ChatInput from '@/components/home/ChatInput';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMetadata } from '@/libs/zustand/metadata';
import { AgentT } from '@/libs/agents/type';

const AgentPage = () => {
  const { agentId } = useParams();
  const { listAgentsWithIsConnected } = useMetadata();
  const [inputValue, setInputValue] = useState('');
  const [selectAgent, setSelectAgent] = useState<AgentT>();

  useEffect(() => {
    if (!agentId) return;
    const agent = listAgentsWithIsConnected?.find(
      (agent) => agent.agentId === agentId
    );
    if (!agent) {
      //TODO: redirect to 404 page
      return;
    }
    setSelectAgent(agent);
  }, [agentId, listAgentsWithIsConnected]);

  return (
    <div className="space-y-8 flex flex-col items-center justify-center h-screen">
      <div>
        <div className="text-lg text-center"> {selectAgent?.name} Agent</div>
        <div className="text-white-500 text-center">
          The most powerful whale watching copilot
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-2/3">
        <ChatInput
            agentId={selectAgent?.agentId || ''}
            isInitial={true}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
