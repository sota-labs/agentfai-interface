import React, { useEffect } from 'react';
import rf from '@/services/RequestFactory';
import AppFallbackImage from '../AppFallbackImage';
import { DefaultImage, RaidenxLogo } from '@/assets/images';
import { getRaindexAuthorizeUrl } from '@/utils/helper';

const AgentList = () => {
  useEffect(() => {
    const getConnectedAgents = async () => {
      const connectedAgents = await rf
        .getRequest('AgentRequest')
        .getConnectedAgents();

      console.log(connectedAgents, 'x');
    };
  }, []);

  const connectToRaidenx = () => {
    const url = getRaindexAuthorizeUrl();
    console.log(url, 'url');
    window.location.replace(url);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-solid border-[#3f3f46] rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AppFallbackImage
                fallbackSrc={DefaultImage}
                src={RaidenxLogo}
                alt={'logo'}
                width={36}
                height={36}
                className="rounded-[8px]"
              />
              <h1 className="text-md">Raidenx</h1>
            </div>
            <div>Chat</div>
          </div>

          <div className="text-xs font-normal text-neutral-400">
            <p>
              The best trading bot on SUI delivering millions of opportunities
              in milliseconds.
            </p>
          </div>
        </div>

        <div className="border border-solid border-[#3f3f46] rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AppFallbackImage
                fallbackSrc={DefaultImage}
                src={RaidenxLogo}
                alt={'logo'}
                width={36}
                height={36}
                className="rounded-[8px]"
              />
              <h1 className="text-md">Raidenx</h1>
            </div>
            <div>
              <button onClick={connectToRaidenx}>Connect</button>
            </div>
          </div>

          <div className="text-xs font-normal text-neutral-400">
            <p>
              The best trading bot on SUI delivering millions of opportunities
              in milliseconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
