'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackHubPageView } from '@/components/ga-events';
import { getHubFromPathname } from '@/lib/hub/paths';

/** Sends hub-dimensioned page_view events for GA4 custom reporting. */
export function HubAnalytics() {
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    const hub = getHubFromPathname(pathname);
    trackHubPageView({
      hub,
      page_path: pathname,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    });
  }, [pathname]);

  return null;
}