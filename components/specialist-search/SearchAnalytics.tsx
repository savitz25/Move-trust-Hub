'use client';

import { useEffect } from 'react';
import type { SpecialistSearchDimensions, SpecialistSearchEvent } from '@/lib/specialist-search/analytics';
import { captureSearchResultsReturned } from '@/components/analytics/posthog-beacons';

function emit(event: SpecialistSearchEvent, dimensions: SpecialistSearchDimensions) {
  const detail = { event, ...dimensions };
  window.dispatchEvent(new CustomEvent('specialist-search', { detail }));
  (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push(detail);
}

export function SearchAnalytics({ dimensions, hasResults }: { dimensions: SpecialistSearchDimensions; hasResults: boolean }) {
  useEffect(() => {
    emit('specialist_search_interpreted', dimensions);
    emit(hasResults ? 'specialist_search_results' : 'specialist_search_zero_results', dimensions);
    const bucket = dimensions.resultCountBucket;
    const resultCount = bucket === '0' ? 0 : bucket === '1' ? 1 : undefined;
    captureSearchResultsReturned({
      surface: 'ask_results',
      capability: dimensions.intent,
      state: dimensions.state,
      resultCount,
      success: hasResults,
    });
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a,summary') : null;
      if (target?.textContent?.includes('Trace this result')) emit('specialist_search_trace_open', dimensions);
      if (target?.matches('a[data-search-action="profile"]')) emit('specialist_search_profile_open', dimensions);
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [dimensions, hasResults]);
  return null;
}
