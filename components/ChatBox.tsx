import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import config from '@/config';
import { Storage } from '@/libs/storage';
import { TMessage, TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { parseSSEMessage } from '@/utils/helper';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import rf from '@/services/RequestFactory';
import { toastError } from '@/libs/toast';

interface ChatBoxI {
  threadId: string;
}
const ChatBox = ({ threadId }: ChatBoxI) => {
  const [thread, setThread] = useState<TThread>();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;

    try {
      setMessages((prev) => [
        ...prev,
        {
          question: inputValue,
          answer: '',
        } as any,
      ]);
      setInputValue('');

      setIsLoading(true);
      const dataMessage = await rf.getRequest('MessageRequest').createMessage({
        agentId: '1', //TODO: Need get agentId
        question: inputValue,
        threadId,
      });

      await getStreamMessage(dataMessage.id);
    } catch (error) {
      console.error('chat error', error);
      toastError('Something went wrong!!');
    } finally {
      setIsLoading(false);
    }
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      let answer = '';

      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        const answerDecoded = parseSSEMessage(decodedChunk);

        if (answerDecoded.data?.content) {
          answer += answerDecoded.data?.content;
        }
      }

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                answer,
              }
            : msg,
        ),
      );
    } catch (error) {
      console.error('getStreamMessage error', error);
      throw error;
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
      console.log(res.docs, 'res.docs');
      setMessages(res.docs.reverse());
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
    <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
      <p className="text-[24px] leading-[32px] font-semibold text-white-0">
        Thread from {formatUnixTimestamp(thread?.createdAt * 1000, 'DD/MM')}
      </p>
      <div
        ref={chatRef}
        className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3"
      >
        {messages.map((askAndAnswer, index) => (
          <QuestionAnswerView
            askAndAnswer={askAndAnswer}
            key={index}
            isLoading={isLoading}
            isTyping={index == messages.length - 1}
          />
        ))}
      </div>
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBox;
