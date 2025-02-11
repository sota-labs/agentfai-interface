import React, { useEffect, useState } from 'react';
import { AppPopover } from '../AppPopover';
import { useMetadata } from '@/libs/zustand/metadata';
import AppFallbackImage from '../AppFallbackImage';
import config from '@/config';

interface AgentPopupI {
  activeAgentId?: string;
  setActiveAgentId?: (agentId: string) => void;
}

const AgentPopup = ({ activeAgentId, setActiveAgentId }: AgentPopupI) => {
  const [isPopoverAgent, setIsPopoverAgent] = useState(false);
  const { listAgents } = useMetadata();
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const handleSelectAgent = (agentId: string) => {
    console.log('handleSelectAgent', agentId);
    if (setActiveAgentId) setActiveAgentId(agentId);
    setIsPopoverAgent(false);
  };

  useEffect(() => {
    if (!listAgents.length) {
      return;
    }

    const agentId = activeAgentId ?? config.defaultAgentId;
    const activeAgent = listAgents.find((item) => item.agentId == agentId);

    setSelectedAgent(activeAgent as any);
  }, [activeAgentId, listAgents]);

  return (
    <div>
      <AppPopover
        isOpen={isPopoverAgent}
        onToggle={(isOpen) => setIsPopoverAgent(isOpen)}
        onClose={() => setIsPopoverAgent(false)}
        trigger={
          <div className="cursor-pointer mx-[8px] mt-1 px-[8px] py-1 rounded-[8px] inline-flex items-center gap-[8px] text-[#29D971]  hover:bg-[#29D971]/25 transition-colors duration-300">
            <span className="text-white-0 text-[14px] leading-[24px] font-medium">
              {selectedAgent?.agentId ? (
                <div className="flex cursor-pointer font-normal text-white-0 rounded-[8px] gap-[10px]">
                  <AppFallbackImage
                    src={selectedAgent.logoUrl || ''}
                    alt={'agent'}
                    width={25}
                    height={25}
                    key={selectedAgent.agentId}
                    className="rounded-[8px]"
                  />
                  <span>{selectedAgent.name}</span>
                </div>
              ) : (
                'loading..'
              )}
            </span>
          </div>
        }
        position="top"
        content={
          <>
            {/* <div className="relative">
              <AppInput
                type="text"
                placeholder="Search Agents"
                className="text-xs"
                rootClassName="p-1 m-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div> */}
            {listAgents?.map((agent, index) => (
              <div
                key={index}
                onClick={() => handleSelectAgent(agent.agentId)}
                className="flex cursor-pointer m-2 py-[6px] px-[8px] text-[14px] leading-[24px] font-normal text-white-0 rounded-[8px] hover:bg-[#29D971]/25 transition-all gap-[10px]"
              >
                <AppFallbackImage
                  src={agent.logoUrl || ''}
                  alt={'agent'}
                  width={30}
                  height={30}
                  className="rounded-[8px]"
                />
                <span>{agent.name}</span>
              </div>
            ))}
          </>
        }
        customClassWrapper="min-w-[200px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
      />
    </div>
  );
};

export default AgentPopup;
