import React from 'react';
import AppFallbackImage from '../AppFallbackImage';
import { DefaultImage } from '@/assets/images';
import { StaticImageData } from 'next/image';

interface AgentCardI {
  srcImage: string | StaticImageData;
  isConnected: boolean;
  handleConnect: () => void;
}
const AgentCard = ({ srcImage, isConnected, handleConnect }: AgentCardI) => {
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
        <div>
          {isConnected ? (
            'Chat'
          ) : (
            <button onClick={handleConnect}>Connect</button>
          )}
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
