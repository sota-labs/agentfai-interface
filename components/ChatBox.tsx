import ChatInput from '@/components/home/ChatInput';
import QuestionAnswerView from '@/components/QuestionAnswerView';
import config from '@/config';
import { Storage } from '@/libs/storage';
import { TMessage, TThread } from '@/types';
import { formatUnixTimestamp } from '@/utils/format';
import { parseSSEMessage } from '@/utils/helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import rf from '@/services/RequestFactory';
import { Virtuoso } from 'react-virtuoso';
import { Oval } from 'react-loader-spinner';

interface ChatBoxI {
  threadId: string;
}
const MESSAGES_LIMIT = 10;

const ChatBox = ({ threadId }: ChatBoxI) => {
  const [thread, setThread] = useState<TThread>();
  const [activeAgentId, setActiveAgentId] = useState<string>('');
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [lastMessageId, setLastMessageId] = useState('');
  const [firstItemIndex, setFirstItemIndex] = useState(MESSAGES_LIMIT);
  const chatBoxRef = useRef<any>(null);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastMessage, setLastMessage] = useState<TMessage | null>(null);

  useEffect(() => {
    setActiveAgentId(thread?.activeAgentId || '');
  }, [thread?.activeAgentId]);

  useEffect(() => {
    if (lastMessage?.status === 'processing' && lastMessage?.id) {
      onChatSuccess(lastMessage?.id || '');
    }
  }, [lastMessage?.status]);

  const onChatSuccess = (messageId: string) => {
    setMessages((prev) => [
      ...prev,
      {
        question: inputValue,
        answer: '',
        id: messageId,
      } as any,
    ]);
    setLastMessageId(messageId);
    getStreamMessage(messageId);
    scrollToBottom();
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
          if (parsed.data?.content && parsed.data?.content !== 'DONE') {
            answer += parsed.data?.content;
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

      scrollToBottom();
    } catch (error) {
      console.error('getStreamMessage error', error);
      throw error;
    } finally {
      setIsSendingMessage(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollToIndex({
          index: messages.length,
          behavior: 'smooth',
        });
      }
    }, 1);
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
    setIsLoadingMessage(true);
    try {
      const data = await rf.getRequest('ThreadRequest').getMessages(threadId, {
        id: threadId,
        page,
        limit: MESSAGES_LIMIT,
      });
      if (page === 1) {
        data?.docs.reverse();
        setMessages(data?.docs || []);
        setLastMessage(data?.docs[0] || null);
      } else {
        setMessages((prevComments) => [...(data?.docs || []), ...prevComments]);
      }
      if (pageNumber >= data?.totalPages) {
        setHasNextPage(false);
      }

      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollToIndex({
            index: MESSAGES_LIMIT,
            behavior: 'auto',
          });
          setFirstItemIndex((prevFirst) => prevFirst + MESSAGES_LIMIT);
        }
      }, 0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const handleLoadMoreComments = useCallback(() => {
    if (hasNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  }, [hasNextPage]);

  useEffect(() => {
    if (!threadId) return;
    getMessages(pageNumber);
  }, [threadId, pageNumber]);

  useEffect(() => {
    if (!threadId) return;
    getThread().then();
  }, [threadId]);

  const Loading = () => {
    return isLoadingMessage ? (
      <div className="flex flex-col items-center justify-center">
        <Oval
          visible={true}
          height="30"
          width="30"
          color="#000000"
          ariaLabel="oval-loading"
        />
      </div>
    ) : (
      ''
    );
  };

  if (!thread) return <></>;

  return (
    <div className="relative flex flex-col gap-2 bg-[#18181A] h-full">
      <p className="text-[24px] leading-[32px] font-semibold text-white-0">
        Thread from {formatUnixTimestamp(thread?.createdAt * 1000, 'DD/MM')}
      </p>
      {messages.length && (
        <Virtuoso
          ref={chatBoxRef}
          data={messages}
          firstItemIndex={firstItemIndex}
          totalCount={messages.length}
          initialTopMostItemIndex={messages.length}
          startReached={handleLoadMoreComments}
          className="h-[calc(100vh-224px)] overflow-auto customer-scroll max-desktop:h-[calc(100vh-216px)] pr-3 mb-4"
          itemContent={(index, askAndAnswer) => (
            <QuestionAnswerView
              askAndAnswer={askAndAnswer}
              key={index}
              index={index}
              isLoading={isSendingMessage && lastMessageId === askAndAnswer.id}
              isTyping={lastMessageId === askAndAnswer.id}
              setEl={handleLoadMoreComments}
              onTypingCompleted={() => {
                setLastMessageId('');
                scrollToBottom();
              }}
            />
          )}
          components={{ Header: Loading }}
        />
      )}
      <ChatInput
        agentId={activeAgentId}
        threadId={threadId}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSuccess={onChatSuccess}
        canSwitchAgent={true}
        setIsSendingMessage={setIsSendingMessage}
        isDisabled={isSendingMessage}
      />
    </div>
  );
};

export default ChatBox;
