'use client';

import { useChat } from 'ai/react';
import { toast } from 'sonner';

import { API_URL } from '@/constants';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';

import { ChatInput } from './chat-input';
import { ChatList } from './chat-list';
import { EmptyScreen } from './empty-screen';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${API_URL}/chat`,
    streamProtocol: 'text',
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { containerRef, endRef } = useScrollToBottom<HTMLDivElement>();

  return (
    <div className='flex h-[calc(100dvh_-theme(spacing.16))] flex-row justify-center pb-4 md:pb-8'>
      <div className='mt-10 flex flex-col items-center justify-between gap-4'>
        <div
          ref={containerRef}
          className='flex h-full w-dvw flex-col items-center gap-4 overflow-y-scroll'
        >
          {messages.length > 0 ? (
            <ChatList isLoading={isLoading} messages={messages} />
          ) : (
            <EmptyScreen />
          )}
          <div ref={endRef} className='min-h-[24px] min-w-[24px] shrink-0' />
        </div>
        <ChatInput
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
        />
      </div>
    </div>
  );
}
