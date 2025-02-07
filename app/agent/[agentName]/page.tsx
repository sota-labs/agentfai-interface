'use client';

import ChatInput from '@/components/home/ChatInput';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import rf from '@/services/RequestFactory';

const AgentPage = () => {
  const router = useRouter();
  // const [chatBot, setChatBot] = useState<
  //   { question: string; answer: string }[]
  // >([]);
  const [inputValue, setInputValue] = useState('');
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (inputValue.length === 0) return;
  //   // setChatBot((prev) => [
  //   //   ...prev,
  //   //   { question: inputValue, answer: exampleAnswer },
  //   // ]);
  //   setInputValue('');
  // };

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
    <div className="space-y-8 flex flex-col items-center justify-center h-screen">
      <div>
        <div className="text-lg text-center">Chart with Agent</div>
        <div className="text-white-500 text-center">
          The most powerful whale watching copilot
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-2/3">
          <ChatInput
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
