import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentT } from '../agents/type';

type TMetadataState = {
  listAgents: AgentT[];
  setListAgents: (payload: AgentT[]) => void;
};

const initialState = {
  listAgents: [],
};

export const useMetadata = create<TMetadataState>()(
  devtools((set) => ({
    ...initialState,
    setListAgents: (payload: AgentT[]) =>
      set(
        (state) => ({ ...state, listAgents: payload }),
        true,
        'metadata/setListAgents',
      ),
  })),
);
