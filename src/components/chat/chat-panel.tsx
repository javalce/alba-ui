'use client';

import { type ChatInputProps } from '@/types/chat';

import { ChatInput } from './chat-input';

export function ChatPanel({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  return (
    <div className='fixed inset-x-0 bottom-0 w-full'>
      <div className='mx-auto sm:max-w-2xl sm:p-4'>
        <ChatInput
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
        />
      </div>
    </div>
  );
}
