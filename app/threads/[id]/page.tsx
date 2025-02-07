'use client';
import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import WalletInfo from '@/components/WalletInfo';
import { FormEvent, useEffect, useState } from 'react';
import { TMessage, TThread } from '@/types';
import rf from '@/services/RequestFactory';
import { useParams } from 'next/navigation';
import { formatUnixTimestamp } from '@/utils/format';
import { useMetadata } from '@/libs/zustand/metadata';

export default function ChatAndWallet() {
  const [thread, setThread] = useState<TThread>();
  const [message, setMessage] = useState<TMessage[]>([]);
  const [chatBot, setChatBot] = useState<
    { question: string; answer: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const { id: threadId }: { id: string } = useParams();
  const { activeAgent } = useMetadata();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    const dataMessage = await rf.getRequest('MessageRequest').createMessage({
      agentId: activeAgent.agentId, //TODO: Need get agentId
      question: inputValue,
      threadId,
    });
    setChatBot((prev) => [
      ...prev,
      { question: inputValue, answer: dataMessage?.answer },
    ]);
    setInputValue('');
  };

  const getThread = async () => {
    try {
      const res = await rf.getRequest('ThreadRequest').getThread(threadId);
      setThread(res);
    } catch (e) {
      console.error(e);
    }
  };

  const getMessages = async () => {
    try {
      const res = await rf.getRequest('ThreadRequest').getMessages(threadId, {
        id: threadId,
        page: 1,
        limit: 10,
      });
      setMessage(res.docs.reverse());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!threadId) return;
    getThread().then();
    getMessages().then();
  }, [threadId]);

  if (!thread) return <></>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-[32px] max-desktop:grid-cols-1">
        <div className="max-w-[718px] col-span-2 h-[calc(100vh-80px)] max-desktop:max-w-full max-desktop:col-span-1 max-desktop:h-[calc(100vh-64px)]">
          <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
            <p className="text-[24px] leading-[32px] font-semibold text-white-0">
              Thread from{' '}
              {formatUnixTimestamp(thread?.createdAt * 1000, 'DD/MM')}
            </p>
            <div className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3">
              {message.map((askAndAnswer, index) => (
                <QuestionAnswerView askAndAnswer={askAndAnswer} key={index} />
              ))}
              {chatBot.map((askAndAnswer, index) => (
                <QuestionAnswerView
                  askAndAnswer={askAndAnswer}
                  key={index}
                  isTyping
                />
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
