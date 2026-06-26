'use client';

import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Wait for idle (ms cap) after entering viewport before activating */
  idleDelay?: number;
  once?: boolean;
};

export function useInView({
  rootMargin = '200px 0px',
  threshold = 0,
  idleDelay = 0,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const activate = () => setInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        if (idleDelay > 0) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(activate, { timeout: idleDelay });
          } else {
            window.setTimeout(activate, Math.min(idleDelay, 500));
          }
        } else {
          activate();
        }

        if (once) observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, idleDelay, once]);

  return { ref, inView };
}