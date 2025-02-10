'use client';
import useTypingEffect from '@/hooks/useTypingEffect';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import Markdown from 'react-markdown';

interface AnswerViewProps {
  askAndAnswer: {
    question: string;
    answer: string;
  };
  isTyping?: boolean;
  isLoading?: boolean;
  index: number;
  setEl: (el: HTMLDivElement | null) => void;
  onTypingCompleted: () => void;
}

const QuestionAnswerView = ({
  askAndAnswer,
  isTyping,
  isLoading,
  index,
  setEl,
  onTypingCompleted,
}: AnswerViewProps) => {
  const typingText = useTypingEffect(
    askAndAnswer?.answer,
    isTyping ? onTypingCompleted : undefined,
  );
  return (
    <div
      ref={(el) => {
        if (index > 0) return;
        setEl(el);
      }}
    >
      <div className="flex justify-end">
        {askAndAnswer?.question && (
          <div className="max-w-64 bg-[#403F45] px-[8px] py-[4px] rounded break-words">
            {askAndAnswer?.question}
          </div>
        )}
      </div>
      <div className="max-w-100 break-words">
        {isTyping ? (
          <>
            {isLoading ? (
              <Oval
                visible={true}
                height="12"
                width="12"
                color="#000000"
                ariaLabel="oval-loading"
              />
            ) : (
              <Markdown className="mark-down-content">{typingText}</Markdown>
            )}
          </>
        ) : (
          <Markdown className="mark-down-content">
            {askAndAnswer?.answer}
          </Markdown>
        )}
      </div>
    </div>
  );
};

export default React.memo(QuestionAnswerView);
