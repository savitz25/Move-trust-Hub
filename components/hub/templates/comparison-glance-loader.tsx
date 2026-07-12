'use client';

import { createClientLoader } from '@/lib/performance/create-client-loader';
import { useInView } from '@/lib/hooks/use-in-view';
import type { ResourceArticleSection } from '@/lib/hub/templates/types';

const ComparisonGlance = createClientLoader<{ section: ResourceArticleSection }>(
  () => import('@/components/hub/templates/comparison-glance'),
  'ComparisonGlance',
);

function GlancePlaceholder() {
  return (
    <div
      className="mb-10 h-48 rounded-xl border border-emerald-200/40 bg-emerald-50/30 animate-pulse"
      aria-hidden="true"
    />
  );
}

/** Below-fold comparison grid — loads when scrolled near viewport. */
export function ComparisonGlanceLoader({ section }: { section: ResourceArticleSection }) {
  const { ref, inView } = useInView({ rootMargin: '280px 0px', idleDelay: 600 });

  return (
    <div ref={ref}>{inView ? <ComparisonGlance section={section} /> : <GlancePlaceholder />}</div>
  );
}