'use client';

import { type Message, useChat } from 'ai/react';

import { API_URL } from '@/constants/api';
import { cn } from '@/lib/utils';

import { ChatInput } from './chat-input';
import { ChatList } from './chat-list';
import { EmptyScreen } from './empty-screen';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is a placeholder for the initial messages
const initialMessages: Message[] = [
  {
    role: 'user',
    content: '¿Qué importe tiene la gratificación concedida a Eva Esperanza Iniesta Bláquez?',
    id: crypto.randomUUID(),
  },
  {
    role: 'assistant',
    content:
      'La gratificación concedida a Eva Esperanza Iniesta Bláquez tiene un importe de 4.000 euros.\n\nFuentes Consultadas:\n- Decreto 5 (página 5)',
    id: crypto.randomUUID(),
  },
];

export function Chat({ className }: { className?: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${API_URL}/chat`,
    streamMode: 'text',
    // initialMessages,
  });

  return (
    <div className='w-full overflow-auto pl-0'>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
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
