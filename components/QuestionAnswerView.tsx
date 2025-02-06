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
}

const QuestionAnswerView = ({
  askAndAnswer,
  isTyping,
  isLoading,
}: AnswerViewProps) => {
  const typingText = useTypingEffect(askAndAnswer.answer);
  return (
    <div>
      <div className="flex justify-end">
        <div className="max-w-64 bg-[#403F45] px-[8px] py-[4px] rounded">
          {askAndAnswer?.question}
        </div>
      </div>
      <div>
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
          <div className="mark-down-content">{askAndAnswer?.answer}</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(QuestionAnswerView);
