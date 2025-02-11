'use client';
import WalletInfo from '@/components/WalletInfo';
import { useParams } from 'next/navigation';
import ChatBox from '@/components/ChatBox';
import { useEffect, useMemo, useState } from 'react';
import config from '@/config';
import rf from '@/services/RequestFactory';
import { useAuthStore } from '@/libs/zustand/auth';
import { AgentWallet } from '@/libs/agents/type';
import { useAgent } from '@/libs/zustand/agent';

export default function ChatAndWallet() {
  const { id: threadId }: { id: string } = useParams();
  const { activeAgentId } = useAgent();
  const { zkAddress, connected } = useAuthStore();
  const [raidenXWallet, setRaidenXWallet] = useState<AgentWallet>();
  const [clientZkAddress, setClientZkAddress] = useState('');

  const currentWallet = useMemo(() => {
    console.log('=== currentWallet', {
      activeAgentId,
      raidenXWallet,
      clientZkAddress,
    });
    return activeAgentId == config.raidenxAgentId
      ? raidenXWallet?.address
      : (clientZkAddress as any);
  }, [raidenXWallet, clientZkAddress, activeAgentId]);

  useEffect(() => {
    if (zkAddress) setClientZkAddress(zkAddress);
  }, [zkAddress]);

  useEffect(() => {
    if (!connected && activeAgentId == config.raidenxAgentId) {
      return;
    }

    const getRaidenXAgentWallet = async () => {
      const data = await rf.getRequest('RaidenXRequest').getWallets();

      setRaidenXWallet(data[0]); // Set first wallet is default wallet
    };

    getRaidenXAgentWallet();
  }, [connected, activeAgentId]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-[32px] max-desktop:grid-cols-1">
        <div className="max-w-[718px] col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <ChatBox threadId={threadId} />
        </div>
        {activeAgentId && <WalletInfo walletAddress={currentWallet} />}
      </div>
    </div>
  );
}
