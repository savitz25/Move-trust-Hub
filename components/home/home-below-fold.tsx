import dynamic from 'next/dynamic';

const ReviewHighlights = dynamic(
  () =>
    import('@/components/trust/review-highlights').then((m) => m.ReviewHighlights),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () =>
    import('@/components/trust/testimonials-section').then(
      (m) => m.TestimonialsSection
    ),
  { ssr: false }
);

const ReviewTransparencyNote = dynamic(
  () =>
    import('@/components/trust/review-transparency-note').then(
      (m) => m.ReviewTransparencyNote
    ),
  { ssr: false }
);

export function HomeBelowFold() {
  return (
    <>
      <ReviewHighlights className="py-16" />
      <TestimonialsSection columns={4} />
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <ReviewTransparencyNote />
      </div>
    </>
  );
}