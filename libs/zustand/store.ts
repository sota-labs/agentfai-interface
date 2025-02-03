import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface ICommonState {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  isSendMessage: boolean;
  setIsSendMessage: (isSendMessage: boolean) => void;
}

const defaultState: ICommonState = {
  isOpenSidebar: false,
  toggleSidebar: () => {},
  isSendMessage: false,
  setIsSendMessage: () => {},
};

export const useCommonStore = create<ICommonState>()(
  devtools((set) => ({
    ...defaultState,
    toggleSidebar: () =>
      set(
        (state) => ({ isOpenSidebar: !state.isOpenSidebar }),
        false,
        'common/toggleSidebar',
    ),
    setIsSendMessage: (isSendMessage: boolean) => {
      set(() => ({ isSendMessage }), false, 'common/setIsSendMessage');
    },
  })),
);
