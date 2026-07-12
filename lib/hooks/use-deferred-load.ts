'use client';

import { useEffect, useState } from 'react';

type DeferredLoadOptions = {
  /** ms before loading when the browser is idle */
  idleTimeout?: number;
  /** ms max wait before force-loading */
  maxWait?: number;
  /** Also trigger on first scroll (good for below-fold widgets) */
  includeScroll?: boolean;
  /** PSI mode: skip idle/scroll/maxWait until real user interaction */
  interactionOnly?: boolean;
};

export function useDeferredLoad({
  idleTimeout = 3000,
  maxWait = 10000,
  includeScroll = false,
  interactionOnly = false,
}: DeferredLoadOptions = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      setReady(true);
      cleanup();
    };

    const interactionEvents = ['pointerdown', 'keydown', 'touchstart'] as const;
    const scrollEvents =
      !interactionOnly && includeScroll ? (['scroll'] as const) : [];

    [...interactionEvents, ...scrollEvents].forEach((event) => {
      window.addEventListener(event, load, { passive: true, once: true });
    });

    let idleId: number | ReturnType<typeof window.requestIdleCallback> | undefined;
    if (!interactionOnly) {
      idleId =
        'requestIdleCallback' in window
          ? window.requestIdleCallback(() => load(), { timeout: idleTimeout })
          : window.setTimeout(load, idleTimeout);
    }

    let maxId: ReturnType<typeof window.setTimeout> | undefined;
    if (!interactionOnly) {
      maxId = window.setTimeout(load, maxWait);
    }

    function cleanup() {
      [...interactionEvents, ...scrollEvents].forEach((event) => {
        window.removeEventListener(event, load);
      });
      if (idleId !== undefined) {
        if (typeof idleId === 'number') {
          window.clearTimeout(idleId);
        } else if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId);
        }
      }
      if (maxId !== undefined) {
        window.clearTimeout(maxId);
      }
    }

    return cleanup;
  }, [ready, idleTimeout, maxWait, includeScroll, interactionOnly]);

  return ready;
}