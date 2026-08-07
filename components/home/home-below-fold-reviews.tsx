'use client';

import dynamic from 'next/dynamic';

/**
 * Client island so next/dynamic may use ssr:false (not allowed in Server Components).
 * Keeps review highlights out of the server RSC graph for first paint.
 */
const ReviewHighlights = dynamic(
  () =>
    import('@/components/trust/review-highlights').then((m) => m.ReviewHighlights),
  {
    ssr: false,
    loading: () => <div className="min-h-[280px] border-t" aria-hidden="true" />,
  }
);

type Props = {
  className?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
};

export function HomeBelowFoldReviews(props: Props) {
  return <ReviewHighlights {...props} />;
}
