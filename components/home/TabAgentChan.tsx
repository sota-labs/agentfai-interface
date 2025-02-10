'use client';
import { MenuDotIcon } from '@/assets/icons';
import AppFallbackImage from '@/components/AppFallbackImage';
import { AppPopover } from '@/components/AppPopover';
// import QuestionAnswerView from '@/components/QuestionAnswerView';
// import { exampleAnswer } from '@/constants/exampleAnswer';
import { useState } from 'react';
import ChatInput from './ChatInput';

const TabAgentChan = () => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);

  // const [chatBot, setChatBot] = useState<
  //   { question: string; answer: string }[]
  // >([]);
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppFallbackImage
              src={'/logo/logo-favicon.png'}
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
              <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#29D971] flex items-center justify-center hover:bg-[#29D971]/25 transition-colors duration-300">
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
          {/* {chatBot.map((askAndAnswer, index) => (
            <QuestionAnswerView askAndAnswer={askAndAnswer} key={index} />
          ))} */}
        </div>
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
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
