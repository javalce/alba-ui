import { renderHook } from '@testing-library/react';
import { type Message } from 'ai';
import { describe, expect, it } from 'vitest';

import { useChatLoader } from '@/hooks/use-chat-loader';

describe('useChatLoader', () => {
  it('should show chat loader when isLoading is true', () => {
    const { result } = renderHook(() => useChatLoader({ messages: [], isLoading: true }));

    expect(result.current.isChatLoaderVisible).toBe(true);
  });

  it('should hide chat loader when last message is from assistant and has content', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello', id: '1' },
      { role: 'assistant', content: 'Hi there!', id: '2' },
    ];

    const { result } = renderHook(() => useChatLoader({ messages, isLoading: false }));

    expect(result.current.isChatLoaderVisible).toBe(false);
  });

  it('should show chat loader when last message is from assistant but has no content', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello', id: '1' },
      { role: 'assistant', content: '', id: '2' },
    ];

    const { result } = renderHook(() => useChatLoader({ messages, isLoading: true }));

    expect(result.current.isChatLoaderVisible).toBe(true);
  });

  it('should hide chat loader when isLoading is false and no messages', () => {
    const { result } = renderHook(() => useChatLoader({ messages: [], isLoading: false }));

    expect(result.current.isChatLoaderVisible).toBe(false);
  });
});
