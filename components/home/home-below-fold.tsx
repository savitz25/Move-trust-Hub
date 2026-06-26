import dynamic from 'next/dynamic';

const ReviewHighlights = dynamic(() =>
  import('@/components/trust/review-highlights').then((m) => m.ReviewHighlights)
);

const TestimonialsSection = dynamic(() =>
  import('@/components/trust/testimonials-section').then((m) => m.TestimonialsSection)
);

export function HomeBelowFold() {
  return (
    <>
      <ReviewHighlights className="py-16" />
      <TestimonialsSection columns={4} />
    </>
  );
}