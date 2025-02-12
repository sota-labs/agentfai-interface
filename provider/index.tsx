'use client';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import config from '@/config';
import {
  closeSocketInstance,
  createSocketInstance,
  ESocketKey,
} from '@/libs/socket';

const queryClient = new QueryClient();

const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const defaultNetWork = config.network || ('testnet' as any);

  useEffect(() => {
    createSocketInstance({ network: defaultNetWork, key: ESocketKey.AGENTFI });
    return () => {
      closeSocketInstance(defaultNetWork, ESocketKey.AGENTFI);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={defaultNetWork}>
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
