import { type Message } from 'ai';
import { useEffect, useState } from 'react';

export function useChatLoader({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const [isChatLoaderVisible, setIsChatLoaderVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsChatLoaderVisible(true);
    }

    const lastMessage = messages.at(-1);

    if (lastMessage?.role === 'assistant' && lastMessage.content) {
      setIsChatLoaderVisible(false);
    }
  }, [isLoading, messages]);

  return { isChatLoaderVisible };
}
