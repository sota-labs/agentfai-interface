import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentT } from '../agents/type';

type TMetadataState = {
  listAgentsWithIsConnected: AgentT[];
  setListAgentsWithIsConnected: (payload: AgentT[]) => void;
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
  })),
);
