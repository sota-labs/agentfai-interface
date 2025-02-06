'use client';
import useTypingEffect from '@/hooks/useTypingEffect';
import React from 'react';
import Markdown from 'react-markdown';

interface AnswerViewProps {
  askAndAnswer: {
    question: string;
    answer: string;
  };
  isTyping?: boolean;
}

const QuestionAnswerView = ({ askAndAnswer, isTyping }: AnswerViewProps) => {
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
          <Markdown className="mark-down-content">{typingText}</Markdown>
        ) : (
          <div className="mark-down-content">{askAndAnswer?.answer}</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(QuestionAnswerView);
