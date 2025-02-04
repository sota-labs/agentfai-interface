'use client';
import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import WalletInfo from '@/components/WalletInfo';
import { exampleAnswer } from '@/constants/exampleAnswer';
import moment from 'moment';
import { FormEvent, useState } from 'react';

export default function ChatAndWallet() {
  const [chatBot, setChatBot] = useState<
    { question: string; answer: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    setChatBot((prev) => [
      ...prev,
      { question: inputValue, answer: exampleAnswer },
    ]);
    setInputValue('');
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-[32px] max-desktop:grid-cols-1">
        <div className="max-w-[718px] xl:max-w-full col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
            <p className="text-[24px] leading-[32px] font-semibold text-white-0">
              Thread from {moment().format('MM/DD')}
            </p>
            <div className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3">
              {chatBot.map((askAndAnswer, index) => (
                <QuestionAnswerView askAndAnswer={askAndAnswer} key={index} />
              ))}
            </div>
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <WalletInfo />
      </div>
    </div>
  );
}
