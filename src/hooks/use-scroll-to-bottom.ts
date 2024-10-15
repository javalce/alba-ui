import { useEffect, useMemo, useRef } from 'react';

export function useScrollToBottom<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const endRef = useRef<T | null>(null);
  const observer = useMemo(() => {
    return new MutationObserver(() => {
      endRef.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [observer]);

  return { containerRef, endRef };
}
