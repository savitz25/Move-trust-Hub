'use client';

import { useEffect } from 'react';
import { trackGaEvent } from '@/components/ga-events';

/** Click-only intelligence events. No hover noise. */
export function HomeIntelEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = event.target instanceof Element ? event.target.closest('[data-intel-event]') : null;
      if (!(el instanceof HTMLElement)) return;
      const name = el.dataset.intelEvent;
      if (!name) return;
      trackGaEvent(name, { page_path: '/', href: el.getAttribute('href') ?? undefined });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
