import { type Message } from 'ai';
import { useEffect, useState } from 'react';

import { ChatLoader } from '@/components/chat/chat-loader';
import { Separator } from '@/components/ui/separator';

import { ChatMessage } from './chat-message';

export function ChatList({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
    }

    const lastMessage = messages.at(-1);

    if (lastMessage?.role === 'assistant' && lastMessage.content) {
      setShow(false);
    }
  }, [isLoading, messages]);

  return (
    <div className='relative mx-auto max-w-2xl px-4'>
      {messages.map((message, index) => (
        <div key={message.id}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && <Separator className='my-4' />}
        </div>
      ))}
      {show ? <ChatLoader text='Generando respuesta' /> : null}
    </div>
  );
}
