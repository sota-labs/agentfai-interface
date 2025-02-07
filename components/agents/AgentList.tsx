import { useMetadata } from '@/libs/zustand/metadata';
import AgentCard from './AgentCard';

const AgentList = () => {
  const { listAgentsWithIsConnected } = useMetadata();

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {listAgentsWithIsConnected?.map((agent) => {
          if (agent.agentId === 'AgentFAI') return;
          return <AgentCard key={agent.agentId} agent={agent} />;
        })}
      </div>
    </div>
  );
};

export default AgentList;
