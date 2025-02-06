import { DefaultImage } from '@/assets/images';
import { getRaindexAuthorizeUrl } from '@/utils/helper';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
import AppFallbackImage from '../AppFallbackImage';
import { ModalConfirm } from './ModalConfirm';
import { ChatIcon } from '@/assets/icons';

interface AgentCardI {
  srcImage: string | StaticImageData;
  isConnected: boolean;
}
const AgentCard = ({ srcImage, isConnected }: AgentCardI) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
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
            src={srcImage}
            alt={'logo'}
            width={36}
            height={36}
            className="rounded-[8px]"
          />
          <h1 className="text-md">Raidenx</h1>
        </div>
        <div className="cursor-pointer">
          {isConnected ? (
            'Chat'
          ) : (
            <div className="!cursor-pointer" onClick={openModal}>
              <ChatIcon className="!w-6 !h-6 !cursor-pointer" color="#A0FFA0" />
            </div>
          )}
          <ModalConfirm
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            connectToRaidenx={connectToRaidenx}
          />
        </div>
      </div>

      <div className="text-xs font-normal text-neutral-400">
        <p>
          The best trading bot on SUI delivering millions of opportunities in
          milliseconds.
        </p>
      </div>
    </div>
  );
};

export default AgentCard;
