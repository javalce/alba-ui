import { type Message } from 'ai';

import { ChatLoader } from '@/components/chat/chat-loader';
import { Separator } from '@/components/ui/separator';

import { ChatMessage } from './chat-message';

export function ChatList({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className='relative mx-auto max-w-2xl px-4'>
      {messages.map((message, index) => (
        <div key={message.id}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && <Separator className='my-4' />}
        </div>
      ))}
      {isLoading ? <ChatLoader text='Generando respuesta' /> : null}
    </div>
  );
}
