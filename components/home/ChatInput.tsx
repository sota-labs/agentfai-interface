'use client';
import AppInput from '@/components/AppInput';
// import { useCommonStore } from '@/libs/zustand/store';
import { FC, FormEvent, SetStateAction } from 'react';

interface ChatInputI {
  inputValue: string;
  setInputValue: (value: SetStateAction<string>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ChatInput: FC<ChatInputI> = ({
  inputValue,
  setInputValue,
  handleSubmit,
}) => {
  // const { isSendMessage } = useCommonStore();

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex item-center bg-[#272729] bottom-0 left-0 rounded-[8px] w-full p-[24px] space-y-1 max-desktop:p-[16px] max-desktop:relative"
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
            disabled={inputValue.length === 0}
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
  );
};

export default ChatInput;
