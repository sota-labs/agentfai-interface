'use client';
import WalletInfo from '@/components/WalletInfo';
import { useParams } from 'next/navigation';
import ChatBox from '@/components/ChatBox';
import { useEffect, useMemo, useState } from 'react';
import config from '@/config';
import rf from '@/services/RequestFactory';
import { useAuthStore } from '@/libs/zustand/auth';
import { AgentWallet } from '@/libs/agents/type';
import { useMetadata } from '@/libs/zustand/metadata';

export default function ChatAndWallet() {
  const { id: threadId }: { id: string } = useParams();
  const [activeAgentId, setActiveAgentId] = useState<string>('');
  const { zkAddress, connected } = useAuthStore();
  const [raidenXWallet, setRaidenXWallet] = useState<AgentWallet>();
  const [clientZkAddress, setClientZkAddress] = useState('');

  const { listAgentsWithIsConnected } = useMetadata();

  const isChattingWithRaidenX = useMemo(() => {
    return activeAgentId == config.raidenxAgentId;
  }, [activeAgentId]);

  useEffect(() => {
    if (zkAddress) setClientZkAddress(zkAddress);
  }, [zkAddress]);

  useEffect(() => {
    if (!connected && isChattingWithRaidenX) {
      return;
    }

    const getRaidenXAgentWallet = async () => {
      const data = await rf.getRequest('RaidenXRequest').getWallets();

      setRaidenXWallet(data[0]); // Set first wallet is default wallet
    };

    getRaidenXAgentWallet();
  }, [connected, listAgentsWithIsConnected.length]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-[32px] max-desktop:grid-cols-1">
        <div className="max-w-[718px] col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <ChatBox
            threadId={threadId}
            activeAgentId={activeAgentId}
            setActiveAgentId={(id) => setActiveAgentId(id)}
          />
        </div>
        <WalletInfo
          walletAddress={
            isChattingWithRaidenX ? raidenXWallet?.address : clientZkAddress
          }
        />
      </div>
    </div>
  );
}
