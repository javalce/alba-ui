import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';

describe('useScrollToBottom', () => {
  const scrollIntoViewMock = vi.fn();
  const observeMock = vi.fn();
  const disconnectMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(global, 'MutationObserver').mockImplementation(() => {
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        takeRecords: vi.fn(),
      };
    });

    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should scroll to bottom when a mutation occurs', () => {
    const { result } = renderHook(() => useScrollToBottom<HTMLDivElement>());

    const container = document.createElement('div');
    const end = document.createElement('div');

    act(() => {
      result.current.containerRef.current = container;
      result.current.endRef.current = end;
    });

    waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
      const observeCallback = observeMock.mock.calls[0][1];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- ignore
      observeCallback([{ addedNodes: document.createElement('div') }]);

      expect(scrollIntoViewMock).toHaveBeenCalledOnce();
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'instant', block: 'end' });
    });
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollToBottom<HTMLDivElement>());

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });
});
