import { AgentT } from '@/libs/agents/type';
import rf from '@/services/RequestFactory';
import { useEffect, useState } from 'react';
import AgentCard from './AgentCard';
import { useMetadata } from '@/libs/zustand/metadata';
import { useUser } from '@/libs/zustand/user';

const AgentList = () => {
  const [agents, setAgents] = useState<AgentT[]>([] as any);
  const { setListAgents } = useMetadata();
  const { setAgentsConnected } = useUser();

  useEffect(() => {
    (async () => {
      const [agents, listAgentsConnected] = await Promise.all([
        rf.getRequest('AgentRequest').getListAgents(),
        rf.getRequest('AgentRequest').getListAgentsConnected(),
      ]);
      const listAgents = agents.map((agent: AgentT) => {
        return {
          ...agent,
          isConnected: listAgentsConnected.some(
            (agentConnected: AgentT) =>
              agentConnected.agentId === agent.agentId,
          ),
        };
      });
      setListAgents(agents);
      setAgentsConnected(listAgentsConnected);
      setAgents(listAgents);
    })();
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => {
          return <AgentCard key={agent.agentId} agent={agent} />;
        })}
      </div>
    </div>
  );
};

export default AgentList;
