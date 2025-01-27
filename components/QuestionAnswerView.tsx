'use client';
import useTypingEffect from '@/hooks/useTypingEffect';
import React from 'react';
import Markdown from 'react-markdown';
interface AnswerViewProps {
  askAndAnswer: {
    question: string;
    answer: string;
  };
}
const QuestionAnswerView = ({ askAndAnswer }: AnswerViewProps) => {
  const typingText = useTypingEffect(askAndAnswer.answer);
  return (
    <div>
      <div className="flex justify-end">
        <div className="max-w-64 bg-[#403F45] px-[8px] py-[4px] rounded">
          {askAndAnswer?.question}
        </div>
      </div>
      <div>
        <Markdown className="mark-down-content">{typingText}</Markdown>
      </div>
    </div>
  );
};

export default React.memo(QuestionAnswerView);
