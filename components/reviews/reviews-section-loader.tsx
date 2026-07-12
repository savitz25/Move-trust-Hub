'use client';

import dynamic from 'next/dynamic';
import type { Review } from '@/types';
import { useInView } from '@/lib/hooks/use-in-view';

const ReviewsSection = dynamic(
  () => import('@/components/reviews/reviews-section').then((m) => m.ReviewsSection),
  { ssr: false }
);

type Props = {
  companyId: string;
  companyName: string;
  initialReviews: Review[];
};

function ReviewsPlaceholder() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-8 w-48 rounded-lg bg-muted/30 animate-pulse" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-28 rounded-xl border bg-muted/20 animate-pulse" />
      ))}
    </div>
  );
}

export function ReviewsSectionLoader(props: Props) {
  const { ref, inView } = useInView({ rootMargin: '240px 0px', idleDelay: 800 });

  return <div ref={ref}>{inView ? <ReviewsSection {...props} /> : <ReviewsPlaceholder />}</div>;
}