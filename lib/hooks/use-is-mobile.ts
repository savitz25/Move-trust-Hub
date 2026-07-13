'use client';

import { useEffect, useState } from 'react';

/** Mobile breakpoint — matches Tailwind `md` (768px). Phones only; tablet+ keeps desktop layout. */
export const MOBILE_MAX_WIDTH_PX = 767;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}