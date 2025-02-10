import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentT } from '../agents/type';

type TMetadataState = {
  listAgents: AgentT[];
  listAgentsWithIsConnected: AgentT[];
  setListAgentsWithIsConnected: (payload: AgentT[]) => void;
  setAgents: (payload: AgentT[]) => void;
};

const initialState = {
  listAgents: [],
  listAgentsWithIsConnected: [],
};

export const useMetadata = create<TMetadataState>()(
  devtools((set) => ({
    ...initialState,
    setListAgentsWithIsConnected: (payload: AgentT[]) =>
      set(
        (state) => ({ ...state, listAgentsWithIsConnected: payload }),
        true,
        'metadata/setListAgentsWithIsConnected',
      ),
    setAgents: (payload: AgentT[]) =>
      set(
        (state) => ({ ...state, listAgents: payload }),
        true,
        'metadata/setAgents',
      ),
  })),
);
