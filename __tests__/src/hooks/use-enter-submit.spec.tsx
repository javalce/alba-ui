import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import Textarea from 'react-textarea-autosize';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useEnterSubmit } from '@/hooks/use-enter-submit';

describe('useEnterSubmit', () => {
  afterEach(() => {
    cleanup();
  });

  it('should initialize formRef with null', () => {
    const { result } = renderHook(() => useEnterSubmit());

    expect(result.current.formRef.current).toBe(null);
  });

  it('should call requestSubmit on Enter key press without shift key', () => {
    const { result } = renderHook(() => useEnterSubmit());
    const requestSubmitSpy = vi.spyOn(result.current, 'onKeyDown');

    render(
      <form ref={result.current.formRef}>
        <Textarea onKeyDown={result.current.onKeyDown} />
      </form>,
    );

    const textarea = screen.getByRole('textbox');

    fireEvent.keyDown(textarea, {
      key: 'Enter',
      shiftKey: false,
      bubbles: true,
      cancelable: true,
    });

    expect(requestSubmitSpy).toHaveBeenCalled();
  });

  it('should not call requestSubmit on Enter key press with shift key', () => {
    const { result } = renderHook(() => useEnterSubmit());
    const requestSubmitSpy = vi.fn();

    render(
      <form ref={result.current.formRef}>
        <Textarea onKeyDown={result.current.onKeyDown} />
      </form>,
    );

    const textarea = screen.getByRole('textbox');

    fireEvent.keyDown(textarea, {
      key: 'Enter',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    expect(requestSubmitSpy).not.toHaveBeenCalled();
  });

  it('should not call requestSubmit on text input', () => {
    const { result } = renderHook(() => useEnterSubmit());
    const requestSubmitSpy = vi.fn();

    render(
      <form ref={result.current.formRef}>
        <Textarea onKeyDown={result.current.onKeyDown} />
      </form>,
    );

    const textarea = screen.getByRole('textbox');

    fireEvent.keyDown(textarea, {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });

    expect(requestSubmitSpy).not.toHaveBeenCalled();
  });
});
