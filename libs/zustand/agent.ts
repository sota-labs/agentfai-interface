import config from '@/config';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TAgentState = {
  activeAgentId: string;
  setActiveAgentId: (id: string) => void;
};

const initialState = {
  activeAgentId: config.defaultAgentId,
};

export const useAgent = create<TAgentState>()(
  devtools((set) => ({
    ...initialState,
    setActiveAgentId: (agentId: string) =>
      set(
        (state) => ({ ...state, activeAgentId: agentId }),
        true,
        'agent/setActiveAgentId',
      ),
  })),
);
