import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentT } from '../agents/type';

type TUserState = {
  agentsConnected: AgentT[];
  setAgentsConnected: (payload: AgentT[]) => void;
};

const initialState = {
  agentsConnected: [],
};

export const useUser = create<TUserState>()(
  devtools((set) => ({
    ...initialState,
    setAgentsConnected: (payload: AgentT[]) =>
      set(
        (state) => ({ ...state, agentsConnected: payload }),
        true,
        'user/setAgentsConnected',
      ),
  })),
);
