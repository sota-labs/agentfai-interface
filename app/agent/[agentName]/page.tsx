'use client';

import ChatInput from '@/components/home/ChatInput';
import React, { FormEvent, useState } from 'react';

const AgentPage = () => {
  // const [chatBot, setChatBot] = useState<
  //   { question: string; answer: string }[]
  // >([]);
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    // setChatBot((prev) => [
    //   ...prev,
    //   { question: inputValue, answer: exampleAnswer },
    // ]);
    setInputValue('');
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
