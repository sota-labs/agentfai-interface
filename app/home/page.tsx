'use client';

import { FeatureIcon } from '@/assets/icons';
import { FullLogo } from '@/assets/images';
import AppFallbackImage from '@/components/AppFallbackImage';
import ChatInput from '@/components/home/ChatInput';
import React, { FormEvent, useState } from 'react';
import rf from '@/services/RequestFactory';
import { useRouter } from 'next/navigation';
import AgentList from '@/components/agents/AgentList';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.length === 0) return;

    try {
      const dataMessage = await rf.getRequest('MessageRequest').createMessage({
        question: inputValue,
      });

      console.log('dataMessage', dataMessage);
      if (dataMessage) {
        router.push(`/threads/${dataMessage.threadId}`);
      }
      setInputValue('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center mt-28">
        <div>
          <AppFallbackImage
            fallbackSrc={FullLogo}
            src={FullLogo}
            alt={'logo'}
            className="rounded-[8px] w-64"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
          <ChatInput
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
      <hr role="presentation" className="w-full border-t border-[#3f3f46]"></hr>
      <div className="space-y-4">
        <div className="flex items-center">
          <FeatureIcon />
          <div>
            <h1 className="text-lg font-semibold text-white-0">
              Featured Agents
            </h1>
          </div>
        </div>
        <AgentList />
      </div>
    </div>
  );
};

export default Home;
