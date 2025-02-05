import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserWallet } from '@/libs/wallet/type';

type TWalletState = {
  userWallets: UserWallet[];
  userAddresses: string[];
  activeWallet: UserWallet;
  setActiveWalletData: (payload: UserWallet) => void;
  setUserAddresses: (address: string) => void;
};

const initialState = {
  userWallet: [],
  userAddresses: [],
  activeWallet: {},
};

export const useUserWallet = create<TWalletState>()(
  devtools((set) => ({
    ...initialState,
    setActiveWalletData: (payload: UserWallet) =>
      set(
        (state) => ({ ...state, activeWallet: payload }),
        true,
        'wallet/setActiveWalletData',
      ),
    setUserAddresses: (address: string) =>
      set(
        (state) => ({
          ...state,
          userAddresses: [address.toLocaleLowerCase(), ...state.userAddresses],
        }),
        true,
        'wallet/setActiveWalletData',
      ),
  })),
);
