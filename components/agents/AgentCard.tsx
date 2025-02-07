import { ChatIcon } from '@/assets/icons';
import { DefaultImage } from '@/assets/images';
import { AgentT } from '@/libs/agents/type';
import { getRaindexAuthorizeUrl } from '@/utils/helper';
import { useState } from 'react';
import AppFallbackImage from '../AppFallbackImage';
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/navigation';

interface AgentCardI {
  agent: AgentT;
}
const AgentCard = ({ agent }: AgentCardI) => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    if (!agent.isConnected) {
      setIsOpenModal(true);
    } else {
      router.push(`/agents/${agent.agentId}`);
    }
  };
  const connectToRaidenx = () => {
    const url = getRaindexAuthorizeUrl();
    window.location.replace(url);
  };
  return (
    <div className="border border-solid border-[#3f3f46] rounded-lg p-4 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AppFallbackImage
            fallbackSrc={DefaultImage}
            src={agent?.logoUrl || ''}
            alt={'logo'}
            width={36}
            height={36}
            className="rounded-[8px]"
          />
          <h1 className="text-md">{agent?.name}</h1>
        </div>
        <div className="cursor-pointer">
          <div className="!cursor-pointer" onClick={openModal}>
            <ChatIcon className="!w-6 !h-6 !cursor-pointer" color="#A0FFA0" />
          </div>

          <ModalConfirm
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            connectToRaidenx={connectToRaidenx}
          />
        </div>
      </div>

      <div className="text-xs font-normal text-neutral-400">
        <p>{agent?.description}</p>
      </div>
    </div>
  );
};

export default AgentCard;
