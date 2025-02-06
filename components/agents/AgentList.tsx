import { DefaultImage } from '@/assets/images';
import { AgentT } from '@/libs/agents/type';
import { useState } from 'react';
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

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => {
          return (
            <AgentCard
              key={agent.id}
              srcImage={agent.logo || ''}
              isConnected={agent.isConnected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AgentList;
