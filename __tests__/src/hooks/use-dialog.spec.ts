import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDialog } from '@/hooks/use-dialog';

describe('useDialog', () => {
  it('should initialize with dialog closed', () => {
    const { result } = renderHook(() => useDialog());

    expect(result.current.open).toBe(false);
  });

  it('should open the dialog', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.openDialog();
    });
    expect(result.current.open).toBe(true);
  });

  it('should close the dialog', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.openDialog();
    });

    act(() => {
      result.current.closeDialog();
    });

    expect(result.current.open).toBe(false);
  });

  it('should change dialog state using onOpenChange', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.onOpenChange(true);
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onOpenChange(false);
    });

    expect(result.current.open).toBe(false);
  });
});
