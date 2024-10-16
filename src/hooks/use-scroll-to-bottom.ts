import { useEffect, useRef } from 'react';

export function useScrollToBottom<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const endRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;
    const observer = new MutationObserver(() => {
      end?.scrollIntoView({ behavior: 'instant', block: 'end' });
    });

    if (container && end) {
      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  return { containerRef, endRef };
}
