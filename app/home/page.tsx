'use client'

import { FeatureIcon } from '@/assets/icons'
import { DefaultImage, FullLogo, RaidenxLogo } from '@/assets/images'
import AppFallbackImage from '@/components/AppFallbackImage'
import ChatInput from '@/components/home/ChatInput'
import { exampleAnswer } from '@/constants/exampleAnswer'
import React, { FormEvent, useState } from 'react'

const Home = () => {
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
  console.log(chatBot, 'chatBot')

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center mt-28">
        <div>
          <AppFallbackImage
            fallbackSrc={FullLogo}
            src={FullLogo}
            alt={"logo"}
            className="rounded-[8px] w-64"
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-2/3'>
          <ChatInput handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </div>
      <hr role="presentation" className="w-full border-t border-[#3f3f46]"></hr>
      <div className="space-y-4">
        <div className='flex items-center'>
          <FeatureIcon />
          <div>
            <h1 className='text-lg font-semibold text-white-0'>Featured Agents</h1>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='border border-solid border-[#3f3f46] rounded-lg p-4 flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <AppFallbackImage
                  fallbackSrc={DefaultImage}
                  src={RaidenxLogo}
                  alt={"logo"}
                  width={36}
                  height={36}
                  className="rounded-[8px]"
                />
                <h1 className='text-md'>Raidenx</h1>
              </div>
              <div>
                Chat
              </div>
            </div>

            <div className='text-xs font-normal text-neutral-400'>
              <p>The best trading bot on SUI delivering millions of opportunities in milliseconds.</p>
            </div>
          </div>

          <div className='border border-solid border-[#3f3f46] rounded-lg p-4 flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <AppFallbackImage
                  fallbackSrc={DefaultImage}
                  src={RaidenxLogo}
                  alt={"logo"}
                  width={36}
                  height={36}
                  className="rounded-[8px]"
                />
                <h1 className='text-md'>Raidenx</h1>
              </div>
              <div>
                Chat
              </div>
            </div>

            <div className='text-xs font-normal text-neutral-400'>
              <p>The best trading bot on SUI delivering millions of opportunities in milliseconds.</p>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Home
