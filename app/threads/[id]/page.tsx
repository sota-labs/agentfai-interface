'use client';
import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import WalletInfo from '@/components/WalletInfo';
import { FormEvent, useEffect, useState } from 'react';
import { TMessage, TThread } from '@/types';
import rf from '@/services/RequestFactory';
import { useParams } from 'next/navigation';
import { formatUnixTimestamp } from '@/utils/format';
import config from '@/config';
import { Storage } from '@/libs/storage';
import { parseSSEMessage } from '@/utils/helper';

export default function ChatAndWallet() {
  const [thread, setThread] = useState<TThread>();
  const [message, setMessage] = useState<TMessage[]>([]);
  const [chatBot, setChatBot] = useState<
    { question: string; answer: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const { id: threadId }: { id: string } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    const dataMessage = await rf.getRequest('MessageRequest').createMessage({
      agentId: '1', //TODO: Need get agentId
      question: inputValue,
      threadId,
    });

    await getStreamMessage(dataMessage.id);

    setChatBot((prev) => [
      ...prev,
      {
        question: inputValue,
        answer: '',
      },
    ]);
    setInputValue('');
  };

  const getStreamMessage = async (messageId: string) => {
    try {
      const { accessToken } = Storage.getZkpData();
      const response = await fetch(
        `${config.authApiUrl}/api/v1/message/sse/${messageId}`,
        {
          headers: {
            'Content-Type': 'text/event-stream',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      // Here we start prepping for the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      const currentChat = chatBot[chatBot.length - 1];

      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        const answerDecoded = parseSSEMessage(decodedChunk);

        if (answerDecoded.data?.content) {
          currentChat.answer += answerDecoded.data?.content;
        }
      }

      if (currentChat.answer) {
        setChatBot((prev) => [...prev, currentChat]);
      }
    } catch (error) {
      console.log('getStreamMessage error', error);
    }
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
                  isTyping={index == chatBot.length - 1}
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
