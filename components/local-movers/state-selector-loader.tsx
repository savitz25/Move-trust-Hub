'use client';

import { createClientLoader } from '@/lib/performance/create-client-loader';

export const StateSelector = createClientLoader(
  () => import('@/components/local-movers/state-selector'),
  'StateSelector',
  {
    loading: () => (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl border bg-muted/20 animate-pulse" />
        ))}
      </div>
    ),
  },
);