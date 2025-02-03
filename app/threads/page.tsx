'use client';
import AppInput from '@/components/AppInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import WalletInfo from '@/components/WalletInfo';
import { exampleAnswer } from '@/constants/exampleAnswer';
import { useCommonStore } from '@/libs/zustand/store';
import moment from 'moment';
import { FormEvent, useState } from 'react';

export default function ChatAndWallet() {
  const { isSendMessage } = useCommonStore();

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
        <div className="max-w-[718px] col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
            <p className="text-[24px] leading-[32px] font-semibold text-white-0">
              Thread from {moment().format('MM/DD')}
            </p>
            <div className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3">
              {chatBot.map((askAndAnswer, index) => (
                <QuestionAnswerView askAndAnswer={askAndAnswer} key={index} />
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-[#272729] absolute bottom-0 left-0 rounded-[8px] w-full p-[16px] space-y-1 max-desktop:p-[16px] max-desktop:relative"
            >
              <AppInput
                type="text"
                placeholder="Message"
                className="text-xs"
                rootClassName="border-none w-[calc(100%-32px)] p-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="flex justify-end absolute right-5 top-1">
                <button
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/75 transition-colors duration-300 disabled:cursor-not-allowed"
                  disabled={inputValue.length === 0 || isSendMessage}
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="#0cad0f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="1.5"
                      d="M18.07 9.57L12 3.5 5.93 9.57M12 20.5V3.67"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <WalletInfo />
      </div>
    </div>
  );
}
