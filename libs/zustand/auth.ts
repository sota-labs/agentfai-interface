import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ZKProof, zkUser } from '@/libs/zklogin/type';
import { Storage } from '@/libs/storage';
import { setAuthorizationToRequest } from '@/services/BaseRequest';

type TAuthState = Partial<zkUser> & {
  connected?: boolean;
  setAccountData: (payload: TAuthState) => void;
  setZkProof: (zkProof: ZKProof) => void;
  logout: () => void;
};

const { connected } = Storage.getZkpData();

const initialState = {
  connected,
};

export const useAuthStore = create<TAuthState>()(
  devtools((set) => ({
    ...initialState,
    setAccountData: (payload: TAuthState) =>
      set(
        (state) => {
          const newState = { ...state, ...payload };
          const clonedState = { ...newState };
          Storage.setZkpData(clonedState);
          setAuthorizationToRequest(clonedState.accessToken || '');

          return clonedState;
        },
        true,
        'auth/setAccountData',
      ),
    setZkProof: (zkProof: ZKProof) => {
      set((state) => ({ ...state, zkProof }), true, 'auth/setZkProof');
    },
    logout: () => {
      set(
        () => {
          Storage.logout();
          setAuthorizationToRequest('');
          return {};
        },
        false,
        'auth/logout',
      );
    },
  })),
);
