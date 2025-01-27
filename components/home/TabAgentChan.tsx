'use client';
import { DefaultImage } from '@/assets/images';
import { MenuDotIcon } from '@/assets/icons';
import AppFallbackImage from '@/components/AppFallbackImage';
import AppInput from '@/components/AppInput';
import { AppPopover } from '@/components/AppPopover';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import { exampleAnswer } from '@/constants/exampleAnswer';
import { useCommonStore } from '@/libs/zustand/store';
import { FormEvent, useState } from 'react';

const TabAgentChan = () => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppFallbackImage
              fallbackSrc={DefaultImage}
              src={DefaultImage}
              width={40}
              height={40}
              alt={'solana'}
              className="rounded-[8px]"
            />
            <div className="">
              <h2 className="font-semibold text-lg">How can I help?</h2>
              <p className="text-neutral-400">
                Send me a message and I&lsquo;ll help you
              </p>
            </div>
          </div>
          <AppPopover
            isOpen={isPopoverMenu}
            onToggle={(isOpen) => setIsPopoverMenu(isOpen)}
            onClose={() => setIsPopoverMenu(false)}
            trigger={
              <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
                <MenuDotIcon />
              </div>
            }
            position="left"
            content={
              <>
                <p className="cursor-pointer py-[6px] px-[24px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                  Revoke
                </p>
                <p className="cursor-pointer py-[6px] px-[24px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                  Export
                </p>
              </>
            }
            customClassWrapper="min-w-[256px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
          />
        </div>
        <div className="mt-6 max-h-[calc(100vh-430px)] overflow-y-auto customer-scroll max-desktop:max-h-[calc(100vh-400px)] pr-3">
          {chatBot.map((askAndAnswer, index) => (
            <QuestionAnswerView askAndAnswer={askAndAnswer} key={index} />
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#272729] bottom-0 left-0 rounded-[8px] w-full p-[16px] space-y-1 max-desktop:p-[16px] relative"
        >
          <AppInput
            type="text"
            placeholder="Message"
            className="text-xs"
            rootClassName="border-none w-[calc(100%-32px)] p-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end">
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
        <div className="flex gap-2 px-2 customer-scroll overflow-x-auto pb-2">
          {[
            'Tokens',
            'NFTs',
            'Swap',
            'Generate Image',
            'Turn that into an NFT',
            'Trending Tokens',
            'Search the Web',
            'Search the Web',
            'Search the Web',
            'Search the Web',
            'Send',
          ].map((action, index) => (
            <button
              key={index}
              className="border border-solid border-[#3f3f46] rounded-sm py-[6px] px-[8px] text-xs flex items-center justify-center min-w-fit"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabAgentChan;
