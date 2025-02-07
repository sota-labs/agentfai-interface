import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import config from '@/config';
import { Storage } from '@/libs/storage';
import { TMessage, TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { parseSSEMessage } from '@/utils/helper';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import rf from '@/services/RequestFactory';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ChatBoxI {
  threadId: string;
}
const ChatBox = ({ threadId }: ChatBoxI) => {
  const [thread, setThread] = useState<TThread>();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [isRespondingIndex, setIsRespondingIndex] = useState<number | null>(null);
  const [isGettingMessage, setIsGettingMessage] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  const onChatSuccess = (messageId: string) => {
    console.log('onChatSuccess', messageId);
    setMessages((prev) => [
      ...prev,
      {
        question: inputValue,
        answer: '',
      } as any,
    ]);
    getStreamMessage(messageId);
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
      let answer = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        buffer += decodedChunk;
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';
        for (const event of events) {
          if (!event.trim()) continue;
          const parsed = parseSSEMessage(event);
          if (parsed.data?.content && parsed.data?.content !== "DONE") {
            answer += parsed.data?.content;
            setIsRespondingIndex(messages.length - 1);
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
          }
        }
      }
    } catch (error) {
      console.error('getStreamMessage error', error);
      throw error;
    } finally {
      setIsRespondingIndex(null);
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

  const getMessages = async (page: number) => {
    try {
      setIsGettingMessage(true);
      const data = await rf.getRequest('ThreadRequest').getMessages(threadId, {
        id: threadId,
        page,
        limit: 10,
      });
      if (page === 1) {
        setMessages(data?.docs.reverse() || []);
      } else {
        setMessages((prevComments) => [
          ...(data?.docs.reverse() || []),
          ...prevComments,
        ]);
      }
      if (pageNumber >= data?.totalPages) {
        setHasNextPage(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGettingMessage(false);
    }
  };

  const handleLoadMoreComments = useCallback(() => {
    if (hasNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const { setEl } = useIntersectionObserver({
    loadMore: handleLoadMoreComments,
  });

  useEffect(() => {
    if (!threadId) return;
    getMessages(pageNumber);
  }, [threadId, pageNumber]);

  useEffect(() => {
    if (!threadId) return;
    getThread().then();
  }, [threadId]);

  if (!thread) return <></>;

  return (
    <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
      <p className="text-[24px] leading-[32px] font-semibold text-white-0">
        Thread from {formatUnixTimestamp(thread?.createdAt * 1000, 'DD/MM')}
      </p>
      {isGettingMessage && (
        <div className="flex flex-col items-center justify-center">
          loading...
        </div>
      )}
      <div
        ref={chatRef}
        className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3"
      >
        {messages.map((askAndAnswer, index) => (
          <QuestionAnswerView
            askAndAnswer={askAndAnswer}
            key={index}
            index={index}
            isTyping={isRespondingIndex === index}
            setEl={setEl}
          />
        ))}
      </div>
      <ChatInput
        agentId={'1'}
        threadId={threadId}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSuccess={onChatSuccess}
      />
    </div>
  );
};

export default ChatBox;
