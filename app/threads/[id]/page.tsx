'use client';
import WalletInfo from '@/components/WalletInfo';
import { useParams } from 'next/navigation';
import ChatBox from '@/components/ChatBox';

export default function ChatAndWallet() {
  const { id: threadId }: { id: string } = useParams();

  return (
    <div>
      <div className="grid grid-cols-3 gap-[32px] max-desktop:grid-cols-1">
        <div className="max-w-[718px] col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <ChatBox threadId={threadId} />
        </div>
        <WalletInfo />
      </div>
    </div>
  );
}
