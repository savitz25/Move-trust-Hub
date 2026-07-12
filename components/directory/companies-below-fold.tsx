import { ReviewHighlights } from '@/components/trust/review-highlights';
import { VerificationTransparency } from '@/components/trust/verification-transparency';

export function CompaniesBelowFold() {
  return (
    <>
      <VerificationTransparency className="mt-10" />
      <ReviewHighlights
        className="py-16 mt-8 border-t"
        compact
        title="Featured Review Highlights"
        subtitle="A quick look at highly rated interstate movers with verified review volume and reputation scores."
      />
    </>
  );
}