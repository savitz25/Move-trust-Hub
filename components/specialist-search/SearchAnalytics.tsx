'use client';

import { useEffect } from 'react';
import type { SpecialistSearchDimensions, SpecialistSearchEvent } from '@/lib/specialist-search/analytics';

function emit(event: SpecialistSearchEvent, dimensions: SpecialistSearchDimensions) {
  const detail = { event, ...dimensions };
  window.dispatchEvent(new CustomEvent('specialist-search', { detail }));
  (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push(detail);
}

export function SearchAnalytics({ dimensions, hasResults }: { dimensions: SpecialistSearchDimensions; hasResults: boolean }) {
  useEffect(() => {
    emit('specialist_search_interpreted', dimensions);
    emit(hasResults ? 'specialist_search_results' : 'specialist_search_zero_results', dimensions);
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a,summary') : null;
      if (target?.textContent?.includes('Trace this result')) emit('specialist_search_trace_open', dimensions);
      if (target?.textContent?.includes('Research this mover')) emit('specialist_search_profile_open', dimensions);
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [dimensions, hasResults]);
  return null;
}
