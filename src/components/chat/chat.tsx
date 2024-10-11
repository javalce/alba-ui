'use client';

import { useChat } from 'ai/react';
import { toast } from 'sonner';

import { API_URL } from '@/constants';
import { cn } from '@/lib/utils';

import { ChatInput } from './chat-input';
import { ChatList } from './chat-list';
import { EmptyScreen } from './empty-screen';

export function Chat({ className }: { className?: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${API_URL}/chat`,
    streamProtocol: 'text',
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className='w-full overflow-auto pl-0'>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length > 0 ? (
          <ChatList isLoading={isLoading} messages={messages} />
        ) : (
          <EmptyScreen />
        )}
        {/* <div className='h-px w-full' /> */}
      </div>
      <div className='fixed inset-x-0 bottom-0 w-full'>
        <div className='mx-auto sm:max-w-2xl sm:p-4'>
          <ChatInput
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            input={input}
          />
        </div>
      </div>
    </div>
  );
}
