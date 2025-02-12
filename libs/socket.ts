'use client';

import { io } from 'socket.io-client';
import { AppBroadcast, BROADCAST_EVENTS } from './broadcast';
import config from '@/config';

export interface ISocketSendTransaction {
  userAddress: string;
}

export enum ESocketKey {
  AGENTFI = 'AGENTFI',
}

declare global {
  interface Window {
    sockets: {
      [ESocketType: string]: ReturnType<typeof io> | null;
    };
  }
}

if (typeof window !== 'undefined') {
  window.sockets = {};
}

export const SOCKET_EVENTS = {
  SEND_TRANSACTION: 'sendTransaction',
};

export const socketInstance = (key: string): ReturnType<typeof io> | null =>
  window.sockets[key];

const createInstanceSocket = (socketUrl: string, accessToken?: string) => {
  return io(socketUrl, {
    transports: ['websocket', 'polling'],
    reconnectionDelayMax: 1000,
    autoConnect: true,
    reconnection: true,
    ...(accessToken && { query: { authorization: accessToken } }),
    auth: { offset: undefined },
  });
};

export const closeInstanceSocket = (
  socketInstance: ReturnType<typeof io> | null,
) => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.close();
  }
};

export const getSocketInstance = (network: string, key: ESocketKey) => {
  if (!network) return null;
  const socketKey = `${key}-${network}`?.toUpperCase();
  return socketInstance(socketKey);
};

export const createSocketInstance = ({
  network,
  accessToken,
  key,
}: {
  network: string;
  accessToken?: string;
  key: ESocketKey;
}) => {
  const socketKey = `${key}-${network}`?.toUpperCase();
  const socketUrl = config.wsUrl;

  if (!socketUrl) {
    console.error('Socket URL is not defined');
    return;
  }

  window.sockets[socketKey] = createInstanceSocket(socketUrl, accessToken);

  window.sockets[socketKey]?.on('connect', () => {
    console.log(
      `Websocket public connection ${network} is connected with server ${socketUrl}`,
    );
    AppBroadcast.dispatch(BROADCAST_EVENTS.SOCKET_CONNECTED, {});

    getSocketInstance(network, key)?.on(
      SOCKET_EVENTS.SEND_TRANSACTION,
      (data: ISocketSendTransaction) => {
        console.log('SOCKET_EVENTS.SEND_TRANSACTION', data);
        AppBroadcast.dispatch(BROADCAST_EVENTS.SOCKET_COMMIT_TRANSACTION, data);
      },
    );
  });

  window.sockets[socketKey]?.on('disconnect', (reason, details) => {
    console.log(
      `Websocket public connection ${network} is disconnected`,
      reason,
      details,
    );
    AppBroadcast.dispatch(BROADCAST_EVENTS.SOCKET_DISCONNECTED, {});
  });
};

export const closeSocketInstance = (network: string, key: ESocketKey) => {
  if (!network) return;
  const socketKey = `${key}-${network}`?.toUpperCase();

  closeInstanceSocket(socketInstance(socketKey));
  window.sockets[socketKey] = null;
};

export const subscribeSocketChatRoom = ({
  key,
  network,
  room,
}: {
  network: string;
  room: string;
  key: ESocketKey;
}) => {
  if (!network) {
    throw new Error('Network is required');
  }
  getSocketInstance(network, key)?.emit('SUBSCRIBE', {
    room: room,
  });
};

export const unsubscribeSocketChatRoom = ({
  key,
  network,
  room,
}: {
  network: string;
  room: string;
  key: ESocketKey;
}) => {
  if (!network) {
    throw new Error('Network is required');
  }
  getSocketInstance(network, key)?.emit('UNSUBSCRIBE', {
    room: room,
  });
};
