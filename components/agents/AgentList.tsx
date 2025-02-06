import React, { useEffect, useState } from 'react';
import rf from '@/services/RequestFactory';
import AppFallbackImage from '../AppFallbackImage';
import { DefaultImage, RaidenxLogo } from '@/assets/images';
import { getRaindexAuthorizeUrl } from '@/utils/helper';
import { AgentT } from '@/libs/agents/type';
import AgentCard from './AgentCard';

const AgentList = () => {
  const [agents, setAgents] = useState<AgentT[]>([
    {
      id: '1',
      name: 'RaindenX',
      logo: DefaultImage,
      isConnected: false,
      description:
        'The best trading bot on SUI delivering millions of opportunities in milliseconds.',
    },
  ] as any);

  const connectToRaidenx = () => {
    const url = getRaindexAuthorizeUrl();
    window.location.replace(url);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => {
          return (
            <AgentCard
              key={agent.id}
              srcImage={agent.logo || ''}
              isConnected={agent.isConnected}
              handleConnect={connectToRaidenx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AgentList;
