'use client';

import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import { useEffect } from 'react';

/** Loads directory/component CSS after first paint — shrinks render-blocking CSS. */
export function DeferredUiStyles() {
  const ready = useDeferredLoad({
    idleTimeout: 1200,
    maxWait: 5000,
    interactionOnly: false,
  });

  useEffect(() => {
    if (!ready) return;
    void import('@/app/ui-components.css');
  }, [ready]);

  return null;
}