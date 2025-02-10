/* eslint-disable @typescript-eslint/no-explicit-any */

export type TBroadcastEvent = {
  detail: any;
};

export const AppBroadcast = {
  on(event: string, callback: any) {
    document.addEventListener(event, callback);
  },
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, callback?: any) {
    document.removeEventListener(event, callback);
  },
};

export enum BROADCAST_EVENTS {
  UPDATE_BALANCE = 'PUBLIC_UPDATE_BALANCE',
}
